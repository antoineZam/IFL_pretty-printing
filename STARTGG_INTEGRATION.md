# start.gg API Integration Guide

This application integrates with the start.gg API to fetch tournament data, player information, and match history.

## Setup

### 1. Get a start.gg API Key

1. Visit [start.gg Developer Portal](https://developer.start.gg/)
2. Create an account or log in
3. Go to [OAuth Applications](https://developer.start.gg/oauth/applications)
4. Create a new OAuth application
5. Copy your API key (Bearer token)

### 2. Configure Environment Variables

Add your start.gg API key to your `.env` file:

```env
STARTGG_API_KEY=your_api_key_here
```

### 3. Understanding Tournament Slugs

Tournament slugs are unique identifiers in start.gg URLs. For example:
- URL: `https://www.start.gg/tournament/iron-fist-league-2024`
- Slug: `iron-fist-league-2024`

## API Endpoints

### Search Tournaments

Search for tournaments by name (useful for finding "iron-fist-league" tournaments):

```
GET /api/startgg/search?term=iron-fist-league
```

Returns a list of tournaments matching the search term.

### Get Tournament Information

Get basic tournament information:

```
GET /api/startgg/tournament/:slug
```

Example:
```
GET /api/startgg/tournament/iron-fist-league-2024
```

### Get Tournament Events and Matches

Get all events and matches for a tournament:

```
GET /api/startgg/tournament/:slug/events?eventSlug=optional
```

### Get All Matches

Get all matches (sets) for a tournament:

```
GET /api/startgg/tournament/:slug/matches?eventSlug=optional
```

### Get Tournament Participants

Get all participants/entrants for a tournament:

```
GET /api/startgg/tournament/:slug/participants?eventSlug=optional
```

### Get Player Information

Get player information from start.gg:

```
GET /api/startgg/player/:playerSlug
```

### Sync Tournament to Database

Sync a tournament from start.gg to your local database:

```
POST /api/startgg/sync/tournament/:slug
Body: { "eventSlug": "optional-event-slug" }
```

This will:
- Create/update tournament in database
- Sync all players to users table
- Sync all matches to matches table

### Sync Player to Database

Sync a player from start.gg to your local database:

```
POST /api/startgg/sync/player/:playerSlug
```

### Get Player Match History (from Database)

Get match history for a player from your database:

```
GET /api/startgg/player/:playerId/matches
```

### Get All Tournaments (from Database)

Get all tournaments stored in your database:

```
GET /api/startgg/tournaments
```

### Get Tournament Matches (from Database)

Get all matches for a tournament from your database:

```
GET /api/startgg/tournament/:tournamentId/matches
```

## Usage Examples

### Finding and Syncing "iron-fist-league" Tournaments

1. **Search for tournaments:**
   ```bash
   curl http://localhost:3000/api/startgg/search?term=iron-fist-league
   ```

2. **Sync a specific tournament:**
   ```bash
   curl -X POST http://localhost:3000/api/startgg/sync/tournament/iron-fist-league-2024
   ```

3. **Get synced tournament data:**
   ```bash
   curl http://localhost:3000/api/startgg/tournaments
   ```

### Fetching Match History

1. **Get matches from start.gg:**
   ```bash
   curl http://localhost:3000/api/startgg/tournament/iron-fist-league-2024/matches
   ```

2. **Get matches from database (after syncing):**
   ```bash
   # First, get tournament ID from /api/startgg/tournaments
   curl http://localhost:3000/api/startgg/tournament/1/matches
   ```

### Getting Player Information

1. **Get player from start.gg:**
   ```bash
   curl http://localhost:3000/api/startgg/player/player-slug
   ```

2. **Sync player to database:**
   ```bash
   curl -X POST http://localhost:3000/api/startgg/sync/player/player-slug
   ```

3. **Get player match history:**
   ```bash
   # Use player user_id from database
   curl http://localhost:3000/api/startgg/player/1/matches
   ```

## Data Mapping

### Tournament Data
- start.gg tournament → `tournaments` table
- Tournament name, dates, and status are stored

### Player Data
- start.gg player → `users` table
- Player gamerTag → username
- Additional player info stored when available

### Match Data
- start.gg set → `matches` table
- Player names mapped to user_ids
- Scores, rounds, and winners stored
- Match timestamps preserved

## Rate Limits

start.gg API has rate limits. The integration handles pagination automatically for large datasets. Be mindful of:
- API rate limits (check start.gg documentation)
- Large tournaments may take time to sync
- Use the sync endpoints sparingly

## Troubleshooting

### API Key Issues
- Ensure `STARTGG_API_KEY` is set in `.env`
- Verify the API key is valid at start.gg developer portal
- Check server logs for authentication errors

### Tournament Not Found
- Verify the tournament slug is correct
- Check if the tournament is public on start.gg
- Some tournaments may require specific permissions

### Sync Errors
- Check database connection
- Verify database tables exist
- Check server logs for detailed error messages

## Future Enhancements

Potential improvements:
- Automatic tournament discovery for series (e.g., all "iron-fist-league" tournaments)
- Scheduled syncing for upcoming tournaments
- Real-time match updates
- Player statistics aggregation
- Tournament bracket visualization

