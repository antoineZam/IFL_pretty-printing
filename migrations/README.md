# Migrations

Run them in this order. Every file is safe to re-run: none of them contain a
`DROP TABLE`, and every `CREATE` uses `IF NOT EXISTS` or an existence check.

| # | File | Creates / changes |
|---|------|-------------------|
| 1 | `core_tables.sql` | `users`, `tournaments`, `matches` — the three tables the whole app is built on |
| 2 | `app_state.sql` | `app_state` — durable JSON state for Run It Back and tag-team |
| 3 | `ewgf_tables.sql` | `iff_players` |
| 4 | `iff9.sql` | `iff9_weeks`, `iff9_matches` (FK → `iff_players`) |
| 5 | `iff_love_n_war_teams.sql` | `iff_love_n_war_teams` (FK → `iff_players`) |
| 6 | `iff_lnw_tournaments.sql` | Love & War tournaments, groups, matches, standings (FK → teams) |
| 7 | `performance_indexes.sql` | Indexes on `users`/`tournaments`/`matches` for databases created before `core_tables.sql` existed |
| 8 | `tournament_event_identity.sql` | Adds `tournaments.startgg_slug` and `matches.event_name` to an existing database |

The order matters: files 4–6 declare foreign keys into tables created by
earlier files.

## Applying them

```sh
npm run migrate
```

That runs every file above, in order, against the database in your `.env`, and
records what it applied in a `schema_migrations` table so a second run is a
no-op. To run one by hand instead:

```sh
mysql -u <user> -p <database> < migrations/core_tables.sql
```

## Optional, destructive

`drop_legacy_ewgf_tables.sql` removes `ewgf_player_stats`, `ewgf_battles` and
`ewgf_players` — leftovers from an abandoned direction that nothing creates and
nothing queries. It is not part of `npm run migrate`; run it once, deliberately,
if your database still has them.
