# Love & War Tournament Setup Guide

## Overview
The Love & War section is a complete 2v2 team tournament management system for displaying team statistics on stream. All pages are protected by the IFF Access Key and are accessible through their own dedicated dashboard.

## Database Setup

### 1. Create the Love & War Teams Table
Run the SQL migration:
```sql
-- Located at: migrations/iff_love_n_war_teams.sql
```

This creates the `iff_love_n_war_teams` table with foreign keys to `iff_players`.

## Folder Structure

### Required Asset Folders

1. **Team Names** (already exists)
   - Path: `client/public/source/overlay/love_and_war/team_names/`
   - Contains: PNG images of team names (stylized text)
   - Naming: Use lowercase with spaces (e.g., "edge of darkness.png")

2. **Team Linework** (needs to be created)
   - Path: `client/public/source/overlay/love_and_war/team_linework/`
   - Contains: Background artwork/linework for each team
   - Naming: Must match team name exactly (e.g., "edge of darkness.png")
   - Note: If linework doesn't exist, a solid red gradient background is used

3. **Default Image** (already exists)
   - Path: `client/public/source/overlay/love_and_war/default.png`
   - Displayed when no team is selected

## Navigation Structure

```
Main Dashboard
└── IFF Dashboard (Protected by IFF Access Key)
    ├── Run It Back Section (existing)
    ├── IFF Player Data (existing)
    └── Love & War Dashboard ← NEW
        ├── Team Management (Control Page)
        ├── Display Control (Select which team to show)
        └── Team Stats Overlay (OBS Source)
```

## Pages Created

### 1. Love & War Dashboard (`/iff/love-and-war`)
- Main hub for all Love & War features
- Links to control pages and overlay
- Shows overview of the tournament

### 2. Team Management (`/iff/love-and-war/control`)
- Create, edit, and delete teams
- Select 2 players from the IFF Players database
- View team compositions
- Each team requires:
  - Team name (must match image filenames)
  - Player 1 (from IFF Players)
  - Player 2 (from IFF Players)

### 3. Display Control (`/iff/love-and-war/display`)
- Select which team to display on stream
- Toggle visibility on/off
- Shows current selection status
- Real-time Socket.IO updates to overlay

### 4. Team Stats Overlay (`/iff/love-and-war/overlay`)
- OBS Browser Source
- Dimensions: 1920x1080
- Shows:
  - Team name as stylized image
  - Background linework artwork
  - Two players side-by-side with stats:
    - Division
    - IFF8 Ranking
    - IFF8 Record
    - IFF History
    - Tekken Rank
    - Tekken Prowess
    - Ranked Matches (Wins, Losses, W/L Rate)
- Fonts: ED Manteca & ED Manteca Black
- Animations: Slides in when displayed, plays once per team change

## API Endpoints

### Teams
- `GET /api/iff/love-and-war/teams` - Get all teams
- `GET /api/iff/love-and-war/team/:id` - Get single team
- `POST /api/iff/love-and-war/team` - Create team
- `PUT /api/iff/love-and-war/team/:id` - Update team
- `DELETE /api/iff/love-and-war/team/:id` - Delete team

### Display Control
- `GET /api/iff/love-and-war/display-state` - Get current display state
- `POST /api/iff/love-and-war/display-state` - Update display state

## Socket.IO Events

- `love-and-war-display-update` - Broadcast when team selection changes
- `love-and-war-team-update` - Broadcast when team data is updated

## How to Use

1. **First Time Setup:**
   - Apply the database migration
   - Add team name images to `/love_and_war/team_names/`
   - Add team linework to `/love_and_war/team_linework/` (optional)
   - Ensure IFF Players are created in the database

2. **Creating Teams:**
   - Navigate to Love & War Dashboard
   - Click "Team Management"
   - Click "Create Team"
   - Enter team name (must match image filenames)
   - Select Player 1 and Player 2
   - Save

3. **Displaying on Stream:**
   - Add "Team Stats Overlay" as OBS Browser Source
   - Navigate to "Display Control"
   - Select a team from the list
   - Team appears on stream with animations
   - Toggle visibility on/off as needed

4. **Team Name Image Requirements:**
   - Format: PNG with transparency
   - Recommended height: ~120px
   - File naming: Lowercase, spaces preserved (e.g., "edge of darkness.png")

5. **Background Linework Requirements:**
   - Format: PNG
   - Dimensions: 1920x1080
   - File naming: Must match team name exactly
   - If not present, red gradient background is used

## Styling & Branding

The overlay includes:
- Red gradient background (if no linework provided)
- Custom ED Manteca fonts throughout
- Drop shadows and glows for visual impact
- Branding footer with:
  - "IRON FROOT FEDERATION"
  - "THE HAUS OF LOAF"
  - "TEKKEN 8 © BANDAI NAMCO"
  - "ALL RIGHTS RESERVED © 2026"

## Troubleshooting

**Team not displaying:**
- Check team name matches image filename exactly
- Verify team has valid player data
- Check browser console for errors
- Ensure Socket.IO connection is established

**Images not loading:**
- Verify file paths are correct
- Check file naming (lowercase, exact match)
- Ensure images are in the public folder
- Check browser network tab for 404 errors

**Animations playing repeatedly:**
- This is by design - animations play once per team change
- Toggling visibility won't re-trigger animations
- Only selecting a different team triggers new animations
