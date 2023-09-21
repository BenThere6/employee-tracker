const mysql = require('mysql2');
// Load environment variables from a .env file.
require('dotenv').config();

// Create a connection pool to the MySQL database.
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,          // Whether to wait for connections when the pool is full
    connectionLimit: 10,               // Maximum number of connections in the pool
    queueLimit: 0,                     // Maximum number of queued connections (0 = unlimited)
})

module.exports = pool;