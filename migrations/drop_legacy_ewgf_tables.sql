-- ============================================================
-- One-off cleanup: remove the abandoned ewgf_* tables.
--
-- `ewgf_player_stats`, `ewgf_battles` and `ewgf_players` are leftovers from a
-- direction that was abandoned: nothing in the repository creates them and
-- nothing queries them. They used to be dropped as a side effect of running
-- ewgf_tables.sql, which also dropped the live `iff_players` table -- so the
-- cleanup and the data loss were the same command.
--
-- This is now a deliberate, separate step. Run it once if your database still
-- has these tables. It is DESTRUCTIVE by design, but only for these three.
--
--   mysql -u <user> -p <database> < migrations/drop_legacy_ewgf_tables.sql
-- ============================================================

DROP TABLE IF EXISTS ewgf_player_stats;
DROP TABLE IF EXISTS ewgf_battles;
DROP TABLE IF EXISTS ewgf_players;
