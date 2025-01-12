const mysql = require("mysql2");
const { config } = require("dotenv");

// Load environment variables from .env file
config();

// Create a connection pool
const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  multipleStatements: true,
}).promise();

// Test connection function
async function testConnection() {
  try {
    await connection.query("SELECT 1");
    console.log("Connected to MYSQL");
  } catch (e) {
    console.error("Error connecting to the database:", e);
    throw e; // Rethrow the error after logging
  }
}

// Lambda-compatible default export
const dbHandler = async (event, context) => {
  try {
    await testConnection(); // Test connection when the handler is invoked
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Database connection successful" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error connecting to the database", error }),
    };
  }
};

module.exports = dbHandler; // Default export for Lambda
module.exports.connection = connection; // Named export for other modules
