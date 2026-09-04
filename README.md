# IFL Pretty Printing

Broadcast overlay and control system for Tekken 8 tournaments — Iron Fist
League (TDEU) and the IFF events (Run It Back, Love & War, IFF9).

Operators drive control pages in a browser; OBS points at overlay routes that
receive updates over Socket.IO in real time.

## Quick start

```sh
cp .env.example .env       # then fill in CONNECTION_KEY and the DB settings
npm run setup              # install both packages, run migrations, build the client
npm start                  # http://localhost:3000
```

For development with hot reload:

```sh
npm run dev                # Vite on 5173, Express on 3000
```

> **Point OBS at 5173 while developing.** Both ports answer the same overlay
> URLs, but 3000 serves the last *build* — not the code you are editing. The
> `X-Served-By` and `X-Bundle-Built` response headers say which one answered.

Full setup, including the schema: [`DATABASE_SETUP.md`](DATABASE_SETUP.md).

## Scripts

| Command | Does |
|---------|------|
| `npm run setup` | Install both packages, apply migrations, build the client |
| `npm run build` | Build the client bundle into `client/dist` |
| `npm run migrate` | Apply pending migrations (`-- --list` to preview) |
| `npm run dev` | Vite (5173) + Express (3000) together |
| `npm start` | Serve the built bundle on `PORT` (default 3000) |
| `npm run lint --prefix client` | ESLint over the client |

## Layout

```
server.js            Express + Socket.IO: routes, live state, broadcast
db.js                MySQL connection pool
dbHelpers.js         All SQL; the only module that talks to the database
startgg.js           start.gg API client (caching, retry, pagination)
startggQueries.js    GraphQL query strings
startggSync.js       Imports tournaments, players and sets from start.gg
migrations/          Schema — see migrations/README.md for the order
scripts/migrate.js   Migration runner
client/              React + Vite front end
  src/pages/TDEU/    Iron Fist League control pages and overlays
  src/pages/IFF/     Run It Back, Love & War, IFF9
  src/utils/api.ts   Shared API client — throws on a non-OK response
  src/utils/routes.ts  Which routes are OBS overlays (no UI chrome)
  public/source/     Overlay artwork and fonts (a RUNTIME dependency)
```

## Two things that are easy to get wrong

**`client/public/source/` must be deployed.** Since `copyPublicDir: false`, the
~176 MB of overlay artwork is no longer copied into `dist/`; the server mounts
`/source` from `client/public/source` directly. Shipping only `dist/` loses
every overlay image with no error — just blank overlays on stream.

**Overlay routes carry no UI chrome and no auth.** An OBS browser source cannot
complete a login, so overlays are unlisted rather than gated. When you add one,
add it to `OVERLAY_ROUTES` in `client/src/utils/routes.ts` — otherwise the
background, page transition and error card all render over your broadcast.

## Authentication

A single shared `CONNECTION_KEY`, enforced server-side on every `/api` route and
on the socket handshake. The client injects it from `localStorage` (see
`client/src/main.tsx`); overlays can also take it as `?key=…`, which is what OBS
sources use. `IFF_ACCESS_KEY` is a second key gating the IFF control pages.
