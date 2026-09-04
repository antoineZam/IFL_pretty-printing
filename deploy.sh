#!/usr/bin/env bash
#
# Production deploy for the IFL overlay system.
#
# Usage:  ./deploy.sh [options]
#
#   -b, --branch <name>   Branch to deploy (default: the checked-out branch)
#       --force           Discard local changes instead of refusing to deploy
#       --skip-install    Never run npm ci, even if a lockfile changed
#       --skip-migrate    Do not apply database migrations
#       --prune-dev       Drop the client's build-only dependencies afterwards
#   -h, --help            Show this and exit
#
# Design notes, because several of these are not obvious:
#
#   * The bundle is built to a staging directory and swapped in, never built
#     in place. `vite build` empties its output directory first, and the
#     running server serves that same directory -- so an in-place build takes
#     the overlays down for the length of the build. Mid-broadcast that is a
#     black source, not a slow one.
#
#   * Migrations run on every deploy. `app_state` is the table the tag-team
#     and Run It Back payloads persist to; without it the server keeps
#     broadcasting but silently stops saving, and the only sign is a
#     `[app_state] Table missing` line in the log.
#
#   * `npm ci` is skipped when the lockfile has not changed. It is by far the
#     slowest step (it deletes node_modules and reinstalls from scratch), and
#     most deploys do not touch dependencies at all.
#
#   * A failed deploy rolls back -- code, bundle and process -- rather than
#     leaving production half-updated.
#
set -Eeuo pipefail

# ------------------------------------------------------------------
# Location
#
# Resolved from the script's own path, so it behaves the same whether it is
# invoked from cron, from the home directory, or from inside the repo. The
# previous version opened with a bare `cd tekken-app` placed *above* `set -e`:
# if that directory was missing the cd failed, the script carried on, and it
# ran git reset and npm ci against whatever directory the caller happened to
# be sitting in.
# ------------------------------------------------------------------
SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
ROOT=$(git -C "$SCRIPT_DIR" rev-parse --show-toplevel 2>/dev/null || echo "$SCRIPT_DIR")
cd "$ROOT"

STATE_DIR="$ROOT/.deploy"
LOCK_FILE="$STATE_DIR/deploy.lock"
LOG_FILE="$STATE_DIR/deploy.log"
DIST="$ROOT/client/dist"
DIST_NEW="$ROOT/client/dist.new"
DIST_PREV="$ROOT/client/dist.prev"

APP_NAME="${APP_NAME:-tekken-app}"
BUILD_HEAP_MB="${BUILD_HEAP_MB:-768}"
HEALTH_TIMEOUT="${HEALTH_TIMEOUT:-60}"

BRANCH=""
FORCE=0
SKIP_INSTALL=0
SKIP_MIGRATE=0
PRUNE_DEV=0

ROLLBACK_ARMED=0
PREV_SHA=""
STARTED_AT=$(date +%s)

# ------------------------------------------------------------------
# Output
# ------------------------------------------------------------------
if [[ -t 1 ]]; then
    C_RESET=$'\033[0m'; C_DIM=$'\033[2m'; C_RED=$'\033[31m'
    C_GREEN=$'\033[32m'; C_YELLOW=$'\033[33m'; C_BOLD=$'\033[1m'
else
    C_RESET=""; C_DIM=""; C_RED=""; C_GREEN=""; C_YELLOW=""; C_BOLD=""
fi

step()  { printf '\n%s==>%s %s%s%s\n' "$C_GREEN" "$C_RESET" "$C_BOLD" "$*" "$C_RESET"; }
info()  { printf '    %s\n' "$*"; }
note()  { printf '    %s%s%s\n' "$C_DIM" "$*" "$C_RESET"; }
warn()  { printf '%s[warn]%s %s\n' "$C_YELLOW" "$C_RESET" "$*" >&2; }
die()   { printf '\n%s[fail]%s %s\n' "$C_RED" "$C_RESET" "$*" >&2; exit 1; }

usage() { sed -n '3,20p' "${BASH_SOURCE[0]}" | sed 's/^# \{0,1\}//'; exit 0; }

# ------------------------------------------------------------------
# Arguments
# ------------------------------------------------------------------
while [[ $# -gt 0 ]]; do
    case "$1" in
        -b|--branch)   BRANCH="${2:-}"; [[ -n "$BRANCH" ]] || die "--branch needs a value"; shift 2 ;;
        --force)       FORCE=1; shift ;;
        --skip-install) SKIP_INSTALL=1; shift ;;
        --skip-migrate) SKIP_MIGRATE=1; shift ;;
        --prune-dev)   PRUNE_DEV=1; shift ;;
        -h|--help)     usage ;;
        *)             die "unknown option: $1 (try --help)" ;;
    esac
done

# ------------------------------------------------------------------
# Failure handling
#
# Anything that fails before the bundle swap leaves production untouched --
# the old code is still checked out and the old process is still serving. Once
# the swap happens we are committed, so from that point a failure restores the
# previous commit and the previous bundle and reloads.
# ------------------------------------------------------------------
on_error() {
    local exit_code=$? line=${1:-?}
    printf '\n%s[fail]%s deploy aborted (exit %s, line %s)\n' "$C_RED" "$C_RESET" "$exit_code" "$line" >&2

    if (( ROLLBACK_ARMED )); then
        printf '%s[fail]%s rolling back to %s\n' "$C_RED" "$C_RESET" "${PREV_SHA:0:12}" >&2
        rollback || printf '%s[fail]%s ROLLBACK FAILED -- production needs hands on it now\n' \
            "$C_RED" "$C_RESET" >&2
    else
        printf '    production untouched -- the old bundle is still being served\n' >&2
    fi
    exit "$exit_code"
}
trap 'on_error $LINENO' ERR

rollback() {
    set +e
    [[ -n "$PREV_SHA" ]] && git reset --hard --quiet "$PREV_SHA"
    if [[ -d "$DIST_PREV" ]]; then
        rm -rf "$DIST"
        mv "$DIST_PREV" "$DIST"
    fi
    pm2 reload "$APP_NAME" --update-env >/dev/null 2>&1
    sleep 3
    if health_check 30 >/dev/null 2>&1; then
        printf '    rollback complete -- %s is serving the previous release again\n' "$APP_NAME" >&2
        return 0
    fi
    return 1
}

# ------------------------------------------------------------------
# Helpers
# ------------------------------------------------------------------

# Read a single value out of .env without sourcing it (sourcing would execute
# whatever is in there, and would clobber this shell's own variables).
env_value() {
    [[ -f "$ROOT/.env" ]] || return 0
    sed -n "s/^[[:space:]]*$1[[:space:]]*=[[:space:]]*//p" "$ROOT/.env" \
        | tail -n1 \
        | sed -e 's/[[:space:]]*$//' -e 's/^"\(.*\)"$/\1/' -e "s/^'\(.*\)'\$/\1/"
}

# Poll the one public, database-free endpoint the server exposes. Everything
# under /api requires the connection key, and / returns the SPA shell whether
# or not the app booted correctly, so neither proves readiness.
health_check() {
    local timeout="${1:-$HEALTH_TIMEOUT}" deadline=$(( $(date +%s) + timeout ))
    while (( $(date +%s) < deadline )); do
        if curl -fsS -m 3 -o /dev/null "http://127.0.0.1:${PORT}/api/rib-auth/required" 2>/dev/null; then
            return 0
        fi
        sleep 2
    done
    return 1
}

# Hash a lockfile so we can tell whether dependencies actually changed.
lock_hash() {
    [[ -f "$1" ]] || { echo "missing"; return; }
    if command -v sha256sum >/dev/null 2>&1; then sha256sum "$1" | cut -d' ' -f1
    else shasum -a 256 "$1" | cut -d' ' -f1; fi
}

# Install only when the lockfile moved since the last successful deploy.
maybe_install() {
    local label="$1" dir="$2" stamp="$3"; shift 3
    local current previous
    current=$(lock_hash "$dir/package-lock.json")
    previous=$(cat "$stamp" 2>/dev/null || echo "none")

    if (( SKIP_INSTALL )); then
        note "$label: skipped (--skip-install)"
        return
    fi
    if [[ "$current" == "$previous" && -d "$dir/node_modules" ]]; then
        note "$label: lockfile unchanged, node_modules present -- skipping npm ci"
        return
    fi

    info "$label: installing (lockfile changed or node_modules missing)"
    ( cd "$dir" && npm ci --no-audit --no-fund "$@" )
    echo "$current" > "$stamp"
}

# ------------------------------------------------------------------
# Single deploy at a time
#
# Two overlapping runs would interleave a git reset with an npm ci and leave
# a tree that matches no commit.
# ------------------------------------------------------------------
mkdir -p "$STATE_DIR"
if command -v flock >/dev/null 2>&1; then
    exec 9>"$LOCK_FILE"
    flock -n 9 || die "another deploy is already running (lock: $LOCK_FILE)"
fi

exec > >(tee -a "$LOG_FILE") 2>&1
printf '\n%s deploy started by %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "${USER:-unknown}"

# ------------------------------------------------------------------
step "Preflight"
# ------------------------------------------------------------------
for tool in git node npm curl pm2; do
    command -v "$tool" >/dev/null 2>&1 || die "$tool is not installed or not on PATH"
done

[[ -f "$ROOT/.env" ]] || die ".env is missing. Copy .env.example and fill it in."
[[ -n "$(env_value CONNECTION_KEY)" ]] || die "CONNECTION_KEY is empty in .env -- the server refuses to boot without it."

# client/public/source is a *runtime* dependency, not build input: since
# copyPublicDir:false the artwork is no longer copied into dist/, and the
# server mounts /source from here directly. If a deploy method ever drops this
# tree the overlays go blank with no error anywhere.
[[ -d "$ROOT/client/public/source" ]] || die "client/public/source is missing -- overlays would render blank. Do not deploy dist/ alone."

PORT="$(env_value PORT)"; PORT="${PORT:-3000}"
info "app=$APP_NAME port=$PORT node=$(node -v)"

if [[ -n "$(git status --porcelain --untracked-files=no)" ]]; then
    if (( FORCE )); then
        warn "working tree is dirty -- discarding local changes (--force)"
    else
        git status --short --untracked-files=no >&2
        die "working tree has uncommitted changes. Investigate (someone may have hot-fixed prod), then re-run with --force to discard."
    fi
fi

# ------------------------------------------------------------------
step "Updating code"
# ------------------------------------------------------------------
PREV_SHA=$(git rev-parse HEAD)
[[ -n "$BRANCH" ]] || BRANCH=$(git rev-parse --abbrev-ref HEAD)
[[ "$BRANCH" != "HEAD" ]] || die "detached HEAD -- pass --branch explicitly"

info "branch: $BRANCH"
git fetch --prune --quiet origin "$BRANCH"

# reset, not pull. `git pull` on a production box can create a merge commit or
# stop halfway with conflicts, leaving a tree that matches no released commit.
# The old script papered over that with `git stash`, which silently buried any
# local change in a stash nobody ever popped.
git reset --hard --quiet "origin/$BRANCH"

NEW_SHA=$(git rev-parse HEAD)
if [[ "$PREV_SHA" == "$NEW_SHA" ]]; then
    note "already at $(git log -1 --format='%h %s')"
else
    info "$(git log -1 --format='%h %s')"
    note "$(git rev-list --count "$PREV_SHA..$NEW_SHA") new commit(s)"
fi

# ------------------------------------------------------------------
step "Dependencies"
# ------------------------------------------------------------------
maybe_install "server" "$ROOT"        "$STATE_DIR/root.lock.sha"  --omit=dev
maybe_install "client" "$ROOT/client" "$STATE_DIR/client.lock.sha"

# ------------------------------------------------------------------
step "Database migrations"
# ------------------------------------------------------------------
if (( SKIP_MIGRATE )); then
    note "skipped (--skip-migrate)"
else
    npm run migrate
fi

# ------------------------------------------------------------------
step "Building client"
# ------------------------------------------------------------------
# NODE_OPTIONS is scoped to this one command on purpose. Exporting it for the
# whole script -- as the previous version did -- also handed the heap cap to
# the server process that pm2 starts, quietly capping production at the build's
# memory budget.
rm -rf "$DIST_NEW"
NODE_OPTIONS="--max-old-space-size=${BUILD_HEAP_MB}" \
    npm --prefix client run build -- --outDir dist.new --emptyOutDir

[[ -f "$DIST_NEW/index.html" ]] || die "build produced no index.html -- refusing to publish an empty bundle"
note "built $(find "$DIST_NEW" -type f | wc -l | tr -d ' ') files, $(du -sh "$DIST_NEW" | cut -f1)"

# ------------------------------------------------------------------
step "Publishing bundle"
# ------------------------------------------------------------------
# Swap rather than build in place. express.static resolves from disk per
# request, so the changeover is a rename, not the length of a build.
rm -rf "$DIST_PREV"
[[ -d "$DIST" ]] && mv "$DIST" "$DIST_PREV"
mv "$DIST_NEW" "$DIST"
ROLLBACK_ARMED=1
info "published (previous bundle kept at client/dist.prev for rollback)"

if (( PRUNE_DEV )); then
    step "Pruning build-only dependencies"
    ( cd "$ROOT/client" && npm prune --omit=dev --no-audit --no-fund )
    rm -f "$STATE_DIR/client.lock.sha"   # force a real install next deploy
    note "client devDependencies removed; next deploy will reinstall them"
fi

# ------------------------------------------------------------------
step "Reloading $APP_NAME"
# ------------------------------------------------------------------
# Explicit, rather than `pm2 reload X || pm2 start Y`: that fallback fires on
# *any* reload failure, including ones where the app is running fine, and
# starts a second process under the same name.
if pm2 describe "$APP_NAME" >/dev/null 2>&1; then
    pm2 reload "$APP_NAME" --update-env
else
    info "no existing process -- starting a new one"
    pm2 start "$ROOT/server.js" --name "$APP_NAME" --time --cwd "$ROOT"
fi
pm2 save --force >/dev/null    # survive a reboot

# ------------------------------------------------------------------
step "Verifying"
# ------------------------------------------------------------------
health_check "$HEALTH_TIMEOUT" \
    || die "app did not become healthy within ${HEALTH_TIMEOUT}s -- see: pm2 logs $APP_NAME --lines 50"
info "health check passed"

# Confirm the *running process* actually picked up the new bundle. The server
# stamps the mtime of the index.html it booted with onto HTML responses, so if
# the reload silently no-opped this comparison catches it -- which a plain 200
# from the health check would not.
#
# The probe path must be one that falls through to the SPA handler: `/` is
# answered by express.static straight from disk and never reaches the code that
# sets this header. Any non-/api path that is not a real file will do.
SERVED=$(curl -fsS -m 5 -o /dev/null -D - "http://127.0.0.1:${PORT}/__deploy-probe" \
    | tr -d '\r' | awk 'tolower($1)=="x-bundle-built:"{print $2}')
ON_DISK=$(node -e "console.log(require('fs').statSync('$DIST/index.html').mtime.toISOString())")

if [[ "$SERVED" == "$ON_DISK" ]]; then
    info "serving bundle built $SERVED"
else
    die "process is serving bundle '$SERVED' but disk has '$ON_DISK' -- the reload did not take effect"
fi

# ------------------------------------------------------------------
step "Done"
# ------------------------------------------------------------------
rm -rf "$DIST_PREV"
ROLLBACK_ARMED=0
trap - ERR

printf '    %s%s%s in %ss\n' "$C_GREEN" "$(git log -1 --format='%h %s')" "$C_RESET" "$(( $(date +%s) - STARTED_AT ))"
printf '    %spm2 logs %s%s\n\n' "$C_DIM" "$APP_NAME" "$C_RESET"
