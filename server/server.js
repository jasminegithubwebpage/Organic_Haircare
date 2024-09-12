const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 3002;

///CORS Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Adjust the origin to match your frontend's URL
  })
);

// Database connection configuration
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Endpoint to get products
app.get("/products", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products;");
    console.log(result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error("Database error:", err);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving products." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
});