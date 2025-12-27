# Database Setup Guide

This application now uses MySQL database instead of JSON files for data storage.

## Database Configuration

The application connects to MySQL at `127.0.0.1:3306` by default. You can configure the connection using environment variables in your `.env` file:

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=tournament_handler
```

## Database Schema

Make sure you have run the provided SQL script to create the database and tables:

- `users` - Stores player information (username, country, bio, main_character)
- `tournaments` - Stores tournament details
- `tournament_participants` - Links users to tournaments
- `matches` - Stores match history with scores and round information

## Data Mapping

### IFL Match Data
- Current match data is stored in the `matches` table
- The system automatically creates/uses an "active" tournament
- Player information is stored in the `users` table
- **Note**: Team information (p1Team, p2Team) is not currently stored in the database schema, so default team values are used

### Player History
- Player history is loaded from the `users` table
- Players are automatically created when they appear in matches

### Tag Team & RIB Data
- Tag team data and Run It Back (RIB) data functions are implemented but currently use default values
- These can be extended to use database storage if needed

## Running the Application

1. Ensure MySQL is running on `127.0.0.1:3306`
2. Create the database using the provided SQL script
3. Configure your `.env` file with database credentials
4. Start the server: `npm start`

The application will automatically:
- Connect to the database on startup
- Create an active tournament if none exists
- Load match data from the database
- Save match updates to the database

## Troubleshooting

If you see database connection errors:
1. Verify MySQL is running: `mysql -u root -p`
2. Check that the database `tournament_handler` exists
3. Verify your `.env` file has correct credentials
4. Ensure the tables from the SQL script have been created

