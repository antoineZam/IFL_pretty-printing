/**
 * The IFL week (edition) number a tournament or event name encodes, or null.
 *
 * Client mirror of weekFromName() in iflSeasons.js. The control pages used to
 * match only "#N", which misses season 2 ("Iron Fist League 2 (Week 7)").
 * An IFL-qualified number wins over a bare one: "TDEU #12 (& IFL #24)" is 24.
 */
export function weekFromName(name: string | null | undefined): number | null {
    if (!name) return null;
    const match =
        name.match(/(?:ifl|iron\s*fist\s*league)(?:\s*\d+)?\s*#\s*(\d+)/i) ||
        name.match(/\[week\s*(\d+)\]/i) ||
        name.match(/\(week\s*(\d+)\)/i) ||
        name.match(/week\s*(\d+)/i) ||
        name.match(/#\s*(\d+)/);
    return match ? Number(match[1]) : null;
}
