const { connection, testConnection } = require("./dbConfig");

async function start() {
  try {
    await testConnection();

    // Start the server
    const app = require("./app");
    app.listen(process.env.PORT, () => {
      console.log("Server Listening on port " + process.env.PORT);
    });
  } catch (e) {
    console.error("Failed to start server:", e);
  }
}

start();
