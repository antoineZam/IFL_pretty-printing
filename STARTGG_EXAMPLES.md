# start.gg Integration Usage Examples

## Quick Start: Finding and Syncing "iron-fist-league" Tournaments

### Step 1: Search for Tournaments

```bash
# Search for all tournaments with "iron-fist-league" in the name
curl "http://localhost:3000/api/startgg/search?term=iron-fist-league"
```

This will return a list of tournaments like:
```json
[
  {
    "id": 12345,
    "name": "Iron Fist League 2024",
    "slug": "iron-fist-league-2024",
    "startAt": "2024-01-15T00:00:00Z",
    "endAt": "2024-01-17T00:00:00Z",
    "events": [...]
  },
  {
    "id": 12346,
    "name": "Iron Fist League 2023",
    "slug": "iron-fist-league-2023",
    ...
  }
]
```

### Step 2: Get Tournament Details

```bash
# Get full tournament information including events
curl "http://localhost:3000/api/startgg/tournament/iron-fist-league-2024"
```

### Step 3: Sync Tournament to Database

```bash
# Sync the entire tournament (all events)
curl -X POST "http://localhost:3000/api/startgg/sync/tournament/iron-fist-league-2024"

# Or sync a specific event
curl -X POST "http://localhost:3000/api/startgg/sync/tournament/iron-fist-league-2024" \
  -H "Content-Type: application/json" \
  -d '{"eventSlug": "tekken-8-singles"}'
```

This will:
- Create the tournament in your database
- Import all players
- Import all matches with scores and rounds

### Step 4: View Synced Data

```bash
# Get all tournaments from your database
curl "http://localhost:3000/api/startgg/tournaments"

# Get matches for a specific tournament (use tournament_id from above)
curl "http://localhost:3000/api/startgg/tournament/1/matches"
```

## Getting Player Information

### Find a Player

```bash
# Get player info from start.gg
curl "http://localhost:3000/api/startgg/player/player-slug-name"
```

### Sync Player to Database

```bash
# Sync player to your database
curl -X POST "http://localhost:3000/api/startgg/sync/player/player-slug-name"
```

### Get Player Match History

```bash
# Get all matches for a player (use user_id from database)
curl "http://localhost:3000/api/startgg/player/1/matches"
```

## Getting Match History

### From start.gg (Live)

```bash
# Get all matches for a tournament
curl "http://localhost:3000/api/startgg/tournament/iron-fist-league-2024/matches"

# Get matches for a specific event
curl "http://localhost:3000/api/startgg/tournament/iron-fist-league-2024/matches?eventSlug=tekken-8-singles"
```

### From Database (After Syncing)

```bash
# Get all tournaments
curl "http://localhost:3000/api/startgg/tournaments"

# Get matches for tournament (use tournament_id from response)
curl "http://localhost:3000/api/startgg/tournament/1/matches"
```

## JavaScript/Node.js Examples

### Using fetch in Browser/Node.js

```javascript
// Search for tournaments
async function searchTournaments(term) {
  const response = await fetch(`http://localhost:3000/api/startgg/search?term=${term}`);
  const tournaments = await response.json();
  return tournaments;
}

// Sync a tournament
async function syncTournament(slug) {
  const response = await fetch(`http://localhost:3000/api/startgg/sync/tournament/${slug}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });
  const result = await response.json();
  return result;
}

// Get player matches
async function getPlayerMatches(playerId) {
  const response = await fetch(`http://localhost:3000/api/startgg/player/${playerId}/matches`);
  const data = await response.json();
  return data.matches;
}

// Usage
(async () => {
  // Find iron-fist-league tournaments
  const tournaments = await searchTournaments('iron-fist-league');
  console.log('Found tournaments:', tournaments);
  
  // Sync the first one
  if (tournaments.length > 0) {
    const result = await syncTournament(tournaments[0].slug);
    console.log('Sync result:', result);
  }
})();
```

## Finding Past and Future Tournaments

### Search Strategy

Since start.gg doesn't have a direct "series" endpoint, you can:

1. **Search by tournament name pattern:**
   ```bash
   curl "http://localhost:3000/api/startgg/search?term=iron-fist-league"
   ```

2. **Filter results by date:**
   - Past tournaments: `startAt < current date`
   - Future tournaments: `startAt > current date`

3. **Sync multiple tournaments:**
   ```javascript
   const tournaments = await searchTournaments('tdeu');
   for (const tournament of tournaments) {
     await syncTournament(tournament.slug);
   }
   ```

## Common Workflows

### Workflow 1: Initial Setup - Import Historical Data

```bash
# 1. Search for all iron-fist-league tournaments
curl "http://localhost:3000/api/startgg/search?term=iron-fist-league" > tournaments.json

# 2. For each tournament, sync it
# (You can automate this with a script)
for slug in iron-fist-league-2024 iron-fist-league-2023 iron-fist-league-2022; do
  curl -X POST "http://localhost:3000/api/startgg/sync/tournament/$slug"
done
```

### Workflow 2: Regular Updates - Sync New Tournaments

```bash
# Search for recent tournaments
curl "http://localhost:3000/api/startgg/search?term=iron-fist-league" | \
  jq '.[] | select(.startAt > "2024-01-01") | .slug' | \
  xargs -I {} curl -X POST "http://localhost:3000/api/startgg/sync/tournament/{}"
```

### Workflow 3: Get Player Statistics

```javascript
// Get all matches for a player across all tournaments
async function getPlayerStats(playerId) {
  const matches = await getPlayerMatches(playerId);
  
  const stats = {
    totalMatches: matches.length,
    wins: matches.filter(m => m.winner_id === playerId).length,
    losses: matches.filter(m => m.winner_id !== playerId && m.winner_id !== null).length,
    tournaments: [...new Set(matches.map(m => m.tournamentName))]
  };
  
  return stats;
}
```

## Error Handling

All endpoints return errors in this format:
```json
{
  "error": "Error message here"
}
```

Common errors:
- `STARTGG_API_KEY is not configured` - Add API key to `.env`
- `Tournament not found` - Check the slug is correct
- `start.gg API error: 401` - Invalid API key
- `start.gg API error: 429` - Rate limit exceeded (wait and retry)

## Tips

1. **API Key**: Always set `STARTGG_API_KEY` in your `.env` file
2. **Rate Limits**: Don't sync too many tournaments at once
3. **Tournament Slugs**: Get them from the start.gg URL: `start.gg/tournament/SLUG-HERE`
4. **Event Slugs**: Some tournaments have multiple events (singles, doubles, etc.)
5. **Database**: Synced data is stored in your MySQL database for fast access

