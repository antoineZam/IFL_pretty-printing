# Database Setup Guide

This application uses MySQL for data storage.

## 1. Environment

Copy `.env.example` to `.env` and fill it in. The server **exits at startup**
with `FATAL` if `CONNECTION_KEY` is missing, so it is not optional:

```env
# Required — the server refuses to boot without this.
CONNECTION_KEY=a_strong_random_string

# Optional — second key for the IFF / Run It Back section.
# If unset, that section is reachable without a second key.
IFF_ACCESS_KEY=

# Optional — start.gg integration is disabled without it.
STARTGG_API_KEY=

# Optional — defaults to 3000.
PORT=3000

# Database
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=ifl_user
DB_PASSWORD=your_password
DB_NAME=tournament_handler
```

Generate a key with `openssl rand -base64 32`. `.env.example` is the
authoritative list of variables.

## 2. Database and schema

Create the database, then apply the migrations:

```sh
mysql -u root -p -e "CREATE DATABASE tournament_handler CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
npm run migrate
```

`npm run migrate` applies every file in `migrations/` in the required order and
records what it applied, so it is safe to re-run and safe on a database that is
already half-provisioned. `npm run migrate -- --list` shows what would run
without changing anything. See [`migrations/README.md`](migrations/README.md)
for the file-by-file breakdown.

### Tables

| Table | Holds |
|-------|-------|
| `users` | Players: `username` (bare gamer tag), `sponsor`, `country`, `main_character` |
| `tournaments` | Tournament details, including the start.gg slug |
| `matches` | Match history: players, scores, winner, round and event name |
| `app_state` | JSON-shaped state: the Run It Back and tag-team payloads, and the scoreboard fields `matches` has no column for |
| `iff_players` | IFF player profiles and radar-chart ratings |
| `iff9_weeks`, `iff9_matches` | IFF9 season weeks and their match-card lineups |
| `iff_love_n_war_teams` | Love & War teams |
| `iff_lnw_tournaments`, `iff_lnw_groups`, `iff_lnw_matches`, `iff_lnw_tournament_teams` | Love & War brackets and standings |

There is no `bio` column on `users` and no `tournament_participants` table —
earlier revisions of this document described both, and neither exists anywhere
in the code. `sponsor` is the column the overlays lean on hardest; it holds the
team/sponsor prefix, which must **not** be folded into `username`.

## 3. Build and run

```sh
npm run setup    # install both packages, migrate, build the client
npm start        # serve on PORT (default 3000)
```

`npm start` serves `client/dist`, which is gitignored build output — on a fresh
clone the server exits with a `FATAL` telling you to build first. For
development with hot reload use `npm run dev` (or `./startup.sh`) and open
**http://localhost:5173**.

> Both ports answer the same overlay URLs. 5173 serves current source; 3000
> serves the last build. Point OBS at 5173 while developing, or you will be
> looking at stale code. The `X-Served-By` and `X-Bundle-Built` response headers
> say which you got.

## 4. Deployment note

`client/public/source/` is a **runtime dependency**, not just a source folder.
Since `copyPublicDir: false` in `vite.config.ts`, the ~176 MB of overlay artwork
is no longer copied into `dist/`; the server mounts `/source` from
`client/public/source` directly. A deploy that ships only `dist/` loses every
overlay image with no error — just blank overlays on stream. Ship both.

## What the app does on startup

- Connects to the database and loads the live state into memory
- Creates an `active` tournament if none exists
- Refuses to start if `CONNECTION_KEY` is unset or the client is not built

On shutdown (`SIGINT`/`SIGTERM`) it flushes any pending scoreboard write, closes
sockets and drains the connection pool before exiting.

## start.gg integration

See [`STARTGG_INTEGRATION.md`](STARTGG_INTEGRATION.md). In short: get a key from
https://developer.start.gg/, put it in `.env` as `STARTGG_API_KEY`, and restart.

## Troubleshooting

**`FATAL: CONNECTION_KEY is not defined`** — add it to `.env`. It has no default
by design.

**`FATAL: client/dist/index.html not found`** — run `npm run build`.

**Database connection errors** — check MySQL is running, the database exists,
and `.env` matches. `npm run migrate -- --list` is a quick connectivity test.

**`[app_state] Table missing`** in the log — `npm run migrate` has not been run.
Run It Back and tag-team changes are broadcasting but not being saved.

**start.gg errors** — verify `STARTGG_API_KEY`. Rate-limit responses (429) are
retried with backoff automatically; a sync that still could not complete returns
`success: false` with a `warnings` array explaining what was missed.
