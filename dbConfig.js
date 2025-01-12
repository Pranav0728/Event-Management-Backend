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



// Start the server function
async function startServer() {
  try {
    // Start the server
    const app = require("./app");
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (e) {
    console.error("Failed to start server:", e);
  }
}

// Start the application
startServer();

module.exports = { connection };
