#!/usr/bin/env bash
#: Deploy the IFL overlay app: update, install, migrate, build, restart, verify.
#:
#:   ./deploy.sh [branch]        deploy a branch (default: the current one)
#:   APP_DIR=/path ./deploy.sh   when the app is not next to this script
#:
#: Safe to re-run, and safe on a fresh box: it installs, migrates and starts
#: the app if none of that has happened yet.
set -euo pipefail

case "${1:-}" in -h|--help) grep '^#:' "$0" | cut -c4-; exit 0 ;; esac

# The app is this script's directory if the script lives in the repo,
# otherwise a checkout sitting next to it. APP_DIR overrides both.
SELF=$(cd "$(dirname "$0")" && pwd)
if [ -z "${APP_DIR:-}" ]; then
    if [ -f "$SELF/server.js" ]; then APP_DIR="$SELF"; else APP_DIR="$SELF/tekken-app"; fi
fi
APP_NAME="${APP_NAME:-tekken-app}"

die() { echo "FAIL: $*" >&2; exit 1; }
say() { printf '\n== %s\n' "$*"; }

# ---------------------------------------------------------------- checks
[ -f "$APP_DIR/server.js" ] || die "no server.js in $APP_DIR — run: APP_DIR=/path/to/app $0"
cd "$APP_DIR"

say "Checking $APP_DIR"
for t in git node npm curl pm2; do command -v "$t" >/dev/null || die "$t is not installed"; done
[ -f .env ] || die ".env missing — cp .env.example .env and fill it in"
grep -qE '^CONNECTION_KEY=.+' .env || die "CONNECTION_KEY is empty in .env — the server refuses to boot"
# Not build input: since copyPublicDir:false the server serves /source straight
# from here. Lose it and every overlay renders blank with no error anywhere.
[ -d client/public/source ] || die "client/public/source missing — overlays would be blank"
PORT=$(sed -n 's/^PORT=//p' .env | tail -1 | tr -d ' \r'); PORT=${PORT:-3000}
echo "   node $(node -v), port $PORT"

# ---------------------------------------------------------------- code
say "Updating code"
BRANCH="${1:-$(git rev-parse --abbrev-ref HEAD)}"
git fetch -q origin "$BRANCH"
# reset, not stash+pull: pull can leave a half-merged tree matching no commit,
# and stash silently buries anything hot-fixed on the box.
git reset -q --hard "origin/$BRANCH"
git log -1 --format='   %h %s'

# ---------------------------------------------------------------- deps
# npm ci wipes and rebuilds node_modules, so only run it when the lockfile
# actually moved. git only rewrites the lockfile when it changed, which makes
# "newer than node_modules" an accurate staleness test.
say "Dependencies"
install_if_stale() {
    local dir=$1; shift
    if [ ! -d "$dir/node_modules" ] || [ "$dir/package-lock.json" -nt "$dir/node_modules" ]; then
        (cd "$dir" && npm ci --no-audit --no-fund "$@")
    else
        echo "   $dir: unchanged"
    fi
}
install_if_stale . --omit=dev
install_if_stale client

# ---------------------------------------------------------------- database
# Creates app_state, which the tag-team and Run It Back payloads persist to.
# Without it the app keeps broadcasting but silently stops saving.
say "Migrations"
npm run migrate

# ---------------------------------------------------------------- build
# Built aside and swapped in. vite empties its output directory first and the
# running server serves that same directory, so building in place takes the
# overlays down for the length of the build.
say "Building"
rm -rf client/dist.new
NODE_OPTIONS="--max-old-space-size=${BUILD_HEAP_MB:-768}" \
    npm --prefix client run build -- --outDir dist.new --emptyOutDir
[ -f client/dist.new/index.html ] || die "build produced no index.html"

rm -rf client/dist.prev
if [ -d client/dist ]; then mv client/dist client/dist.prev; fi
mv client/dist.new client/dist

# ---------------------------------------------------------------- run
# Fork mode, never cluster: the socket.io broadcast state lives in the process.
say "Restarting $APP_NAME"
if pm2 describe "$APP_NAME" >/dev/null 2>&1; then
    pm2 restart "$APP_NAME" --update-env
else
    pm2 start server.js --name "$APP_NAME" --time
fi
pm2 save --force >/dev/null || true   # needs `pm2 startup` once to survive reboot

# ---------------------------------------------------------------- verify
# The server exits on a bad CONNECTION_KEY or an unbuilt client, so "pm2 says
# online" is not enough — ask it something. This is the only public route that
# needs neither the key nor the database.
say "Verifying"
for _ in $(seq 30); do
    if curl -fs -m 2 -o /dev/null "http://127.0.0.1:$PORT/api/rib-auth/required"; then
        ok=1; break
    fi
    sleep 1
done
if [ -z "${ok:-}" ]; then
    pm2 logs "$APP_NAME" --lines 20 --nostream || true
    die "app did not come up on :$PORT (previous bundle is still in client/dist.prev)"
fi

echo
echo "OK  $(git log -1 --format='%h %s')"
echo "    http://127.0.0.1:$PORT   ·   pm2 logs $APP_NAME"
