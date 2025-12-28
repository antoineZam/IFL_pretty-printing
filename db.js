const mysql = require('mysql2/promise');

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'tournament_handler',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000 // 10 second timeout
};

console.log('\n========================================');
console.log('       DATABASE CONNECTION TEST');
console.log('========================================');
console.log(`Host:     ${dbConfig.host}`);
console.log(`Port:     ${dbConfig.port}`);
console.log(`User:     ${dbConfig.user}`);
console.log(`Database: ${dbConfig.database}`);
console.log(`Password: ${dbConfig.password ? '******** (set)' : '(empty)'}`);
console.log('----------------------------------------');

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test connection on startup
async function testConnection() {
  try {
    console.log('Testing connection...');
    const connection = await pool.getConnection();
    
    // Test a simple query
    const [rows] = await connection.query('SELECT 1 as test');
    
    if (rows && rows[0] && rows[0].test === 1) {
      console.log('✓ Database connected successfully!');
      console.log('✓ Query test passed!');
      
      // Check if tables exist
      const [tables] = await connection.query('SHOW TABLES');
      console.log(`✓ Found ${tables.length} table(s) in database`);
      if (tables.length > 0) {
        tables.forEach(t => {
          const tableName = Object.values(t)[0];
          console.log(`  - ${tableName}`);
        });
      }
    }
    
    connection.release();
    console.log('========================================\n');
    return true;
  } catch (err) {
    console.log('✗ Database connection FAILED!');
    console.log(`Error: ${err.message}`);
    console.log('----------------------------------------');
    console.log('Troubleshooting:');
    console.log('  1. Is your SSH tunnel running?');
    console.log('  2. Check DB_USER and DB_PASSWORD in .env');
    console.log('  3. Verify the database exists');
    console.log('  4. Check if MySQL is accepting connections');
    console.log('========================================\n');
    return false;
  }
}

// Run test immediately
testConnection();

module.exports = pool;

