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
app.use(cors());
app.use(express.json());
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
  console.log("jas");
  try {
    const result = await pool.query("SELECT * FROM products;");

   // console.log(result.rows);

    res.json(result.rows);
  } catch (err) {
    console.error("Database error:", err);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving products." });
  }
});

// Route to get trending products
app.get('/trending-products', async (req, res) => {
  const query = 'SELECT * FROM products ORDER BY  added_date desc limit 4' ;
  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get best-selling products
app.get('/best-selling-products', async (req, res) => {
  const query = 'SELECT * FROM products ORDER BY count  DESC LIMIT 4';
  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get today’s deals
app.get('/today-deals', async (req, res) => {
  const query = 'SELECT * FROM products ORDER BY discount   LIMIT 4';
  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get top-sold products
app.get('/top-sold-products', async (req, res) => {
  const query = 'SELECT * FROM products ORDER BY count DESC LIMIT 4';
  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch product details by product ID
app.get("/products/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const result = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [productId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    const product = result.rows[0];
    console.log("Product fetched from DB:", product); // Add this for debugging
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error); // Log the error for easier debugging
    res.status(500).json({ error: error.message });
  }
});


app.get('/products/:id/ingredients', async (req, res) => {
  const productId = req.params.id;
  try {
    const result = await pool.query(
      'SELECT ingredient FROM product_ingredients WHERE product_id = $1',
      [productId]
    );
    const ingredients = result.rows.map(row => ({ name: row.ingredient }));
    console.log(ingredients);
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//fetch the review
app.get('/products/:id/reviews', async (req, res) => {
  const productId = req.params.id;
  try {
    const result = await pool.query(
      'SELECT * FROM product_reviews WHERE product_id = $1',
      [productId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
