// ============================================================
// IFL SEASON REGISTRY
//
// Every season of the Iron Fist League has been published on start.gg under a
// different slug convention, so "which season is this tournament?" was until now
// a hard-coded `iron-fist-league-2` prefix scattered across the start.gg layer.
// This module is the one place that knows the shapes:
//
//   Season 1  league  iron-fist-league
//             events  iron-fist-league-9, iron-fist-league-18-heat-ingager-...,
//                     iron-fist-league-4-8 (one tournament, five editions)
//   Season 2  league  IFL2            (canonically tournament/iron-fist-league-2-1)
//             events  iron-fist-league-2-week-1 ... -week-22, short IFL2-W1
//   Season 3  league  IFL3            (not created yet -- see below)
//             events  IFL3-W1 -> iron-fist-league-3-1-road-to-evo-france-qualifier
//
// Season 3 is published with short slugs first: https://www.start.gg/IFL3-W1 is
// the canonical link the organiser shares, and the full slug carries a per-week
// marketing suffix that cannot be derived. Discovery therefore cannot rely on
// the canonical prefix alone, and it cannot rely on the league either until the
// league object exists -- so each season also declares how to build the slug for
// week N, which lets the season be walked week by week.
// ============================================================

const SEASONS = [
  {
    season: 1,
    label: 'Season 1',
    name: 'Iron Fist League',
    // The season 1 league is the only one without a numbered slug.
    leagueSlug: 'iron-fist-league',
    // Season 1 editions are numbered straight off the base slug, with no
    // separating word: iron-fist-league-9. A handful carry a suffix, and a few
    // early editions share a single tournament, so only the plain form can be
    // built blind.
    weekSlugs: (week) => [`iron-fist-league-${week}`],
  },
  {
    season: 2,
    label: 'Season 2',
    name: 'Iron Fist League 2',
    leagueSlug: 'IFL2',
    weekSlugs: (week) => [`iron-fist-league-2-week-${week}`, `IFL2-W${week}`],
  },
  {
    season: 3,
    label: 'Season 3',
    name: 'Iron Fist League 3',
    leagueSlug: 'IFL3',
    // The short slug comes first: it is the only form that can be built without
    // knowing the week's marketing suffix.
    weekSlugs: (week) => [`IFL3-W${week}`, `iron-fist-league-3-${week}`],
  },
];

const SEASON_NUMBERS = SEASONS.map(s => s.season);
const CURRENT_SEASON = Math.max(...SEASON_NUMBERS);

/** Every season, oldest first. */
function listSeasons() {
  return SEASONS.map(({ season, label, name, leagueSlug }) => ({ season, label, name, leagueSlug }));
}

/** The registry entry for a season number, or undefined. */
function getSeason(season) {
  return SEASONS.find(s => s.season === Number(season));
}

/**
 * Reads a season out of a request parameter.
 *
 * Accepts a number, a numeric string, "3", "s3" or "season 3". Returns null for
 * anything that is not a season this registry knows -- callers decide whether
 * that means "all seasons" or "the current one", so an unknown value never
 * silently becomes season 1.
 */
function parseSeason(value) {
  if (value === null || value === undefined || value === '') return null;
  const match = String(value).trim().match(/(\d+)\s*$/);
  if (!match) return null;
  const season = Number(match[1]);
  return SEASON_NUMBERS.includes(season) ? season : null;
}

/** 'Season 3' for 3; falls back to a generated label for unknown seasons. */
function seasonLabel(season) {
  return getSeason(season)?.label ?? `Season ${season}`;
}

/**
 * Reduces anything that identifies a tournament to a bare start.gg slug.
 *
 * Accepts what people actually paste: a full URL
 * (https://www.start.gg/IFL3-W1, with or without /details or a query string),
 * an API path slug (tournament/iron-fist-league-2-week-1), an event path, or
 * the bare slug itself.
 */
function normalizeSlug(input) {
  if (!input) return '';
  let slug = String(input).trim();

  // Drop scheme + host, including the /tournament/ segment start.gg puts in
  // long-form links but leaves out of short ones.
  slug = slug.replace(/^https?:\/\/[^/]+\/?/i, '');
  slug = slug.replace(/^tournament\//i, '');
  // Trailing page segments on a shared link: /details, /events, /event/x/...
  slug = slug.replace(/\/(details|events?|standings|brackets?|attendees)(\/.*)?$/i, '');
  slug = slug.replace(/[?#].*$/, '');
  slug = slug.replace(/^\/+|\/+$/g, '');

  return slug;
}

/**
 * Which season a slug belongs to, or null when it cannot be told from the slug.
 *
 * Order matters. Season 1 claims the unnumbered base slug, and its editions are
 * numbered off it -- so `iron-fist-league-20-road-to-heat-ingager` must not be
 * read as season 2. The numbered forms are matched first, and only against a
 * season number this registry knows, which is what keeps edition 20 (and 4-8,
 * and 25) with season 1 where they belong.
 */
function seasonFromSlug(input) {
  const slug = normalizeSlug(input).toLowerCase();
  if (!slug) return null;

  // Short form: IFL3-W1, IFL2, IFL3.
  const short = slug.match(/^ifl-?(\d+)(?:$|[-/])/);
  if (short && SEASON_NUMBERS.includes(Number(short[1]))) return Number(short[1]);

  // Canonical form: iron-fist-league-3-1-road-to-evo-france-qualifier. The
  // trailing hyphen in the pattern is what separates season 2 from edition 20.
  const canonical = slug.match(/^iron-fist-league-(\d+)-/);
  if (canonical && SEASON_NUMBERS.includes(Number(canonical[1])) && Number(canonical[1]) > 1) {
    return Number(canonical[1]);
  }

  if (slug === 'ifl' || slug.startsWith('iron-fist-league')) return 1;

  return null;
}

/** True when `slug` is one of `season`'s tournaments. */
function belongsToSeason(slug, season) {
  return seasonFromSlug(slug) === Number(season);
}

/**
 * The week (edition) number a slug encodes, or null.
 *
 * Season 3 numbers the week in both of its forms -- IFL3-W1 and
 * iron-fist-league-3-1-... -- so the season number has to be consumed before the
 * week is read, or "3" would be taken for the week.
 */
function weekFromSlug(input) {
  const slug = normalizeSlug(input).toLowerCase();
  if (!slug) return null;

  const short = slug.match(/^ifl-?\d*-w(\d+)/);
  if (short) return Number(short[1]);

  const week = slug.match(/-week-(\d+)/);
  if (week) return Number(week[1]);

  const season = seasonFromSlug(slug);
  if (season && season > 1) {
    const numbered = slug.match(new RegExp(`^iron-fist-league-${season}-(\\d+)`));
    return numbered ? Number(numbered[1]) : null;
  }

  const edition = slug.match(/^iron-fist-league-(\d+)/);
  return edition ? Number(edition[1]) : null;
}

/**
 * The week (edition) number a display name encodes, or null.
 *
 * Covers every form the three seasons have used: "[Week 3]", "(Week 3)",
 * "IFL #9", "Iron Fist League 3 #1 - ROAD TO EVO FRANCE Qualifier".
 *
 * An IFL-qualified number wins over a bare one, because season 1 has an edition
 * that ran inside someone else's tournament: "TDEU #12 (& IFL #24)" is IFL
 * edition 24, not 12.
 */
function weekFromName(name) {
  if (!name) return null;
  const text = String(name);
  const match =
    text.match(/(?:ifl|iron\s*fist\s*league)(?:\s*\d+)?\s*#\s*(\d+)/i) ||
    text.match(/\[week\s*(\d+)\]/i) ||
    text.match(/\(week\s*(\d+)\)/i) ||
    text.match(/week\s*(\d+)/i) ||
    text.match(/#\s*(\d+)/);
  return match ? Number(match[1]) : null;
}

/**
 * The week number for a start.gg event or tournament, from whichever of its
 * fields carries it. Season 2 puts it only in the tournament name ("Iron Fist
 * League 2 (Week 7)") while its event names are all identical; season 1 puts it
 * only in the event name ("IFL #9") while five editions share one tournament.
 */
function weekNumberOf({ eventName, eventSlug, tournamentName, tournamentSlug } = {}) {
  return weekFromName(eventName)
    ?? weekFromSlug(eventSlug)
    ?? weekFromName(tournamentName)
    ?? weekFromSlug(tournamentSlug)
    ?? null;
}

/** Candidate slugs for week N of a season, best guess first. */
function weekSlugCandidates(season, week) {
  const entry = getSeason(season);
  return entry ? entry.weekSlugs(week) : [];
}

module.exports = {
  SEASONS,
  SEASON_NUMBERS,
  CURRENT_SEASON,
  listSeasons,
  getSeason,
  parseSeason,
  seasonLabel,
  normalizeSlug,
  seasonFromSlug,
  belongsToSeason,
  weekFromSlug,
  weekFromName,
  weekNumberOf,
  weekSlugCandidates,
};
