import express from "express";
import pkg from "pg";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import bcrypt from "bcrypt";
import fs from "fs";
import { fileURLToPath } from "url";
import passport from "passport";
import session from "express-session";
import bodyParser from "body-parser";
import { Strategy } from "passport-local";

dotenv.config();

const app = express();
const port = 3002;

// Middleware
app.use(cors({ origin: "http://localhost:3000" })); // Adjust to match your frontend's URL
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Database connection configuration
const { Pool } = pkg;
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Directory path for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Passport configuration
passport.use(
  new Strategy(async function verify(username, password, cb) {
    try {
      const result = await pool.query("SELECT * FROM users WHERE email = $1", [
        username,
      ]);

      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;

        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            console.error("Error comparing passwords:", err);
            return cb(err);
          }

          if (valid) {
            return cb(null, user);
          } else {
            return cb(null, false, { message: "Incorrect password" });
          }
        });
      } else {
        return cb(null, false, { message: "User not found" });
      }
    } catch (err) {
      console.error("Error during authentication:", err);
      return cb(err);
    }
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length > 0) {
      cb(null, result.rows[0]);
    } else {
      cb(new Error("User not found"));
    }
  } catch (err) {
    cb(err);
  }
});

// Payment route
app.get("/payment", (req, res) => {
  if (req.isAuthenticated()) {
    res.sendFile(path.join(__dirname, "public", "payment.js"));
  } else {
    res.redirect("/login");
  }
});

// Endpoint to get products
app.get("/products", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products;");
    res.json(result.rows);
  } catch (err) {
    console.error("Database error:", err);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving products." });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Route to get trending products
app.get("/trending-products", async (req, res) => {
  const query = "SELECT * FROM products ORDER BY added_date DESC LIMIT 4";
  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching trending products:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get best-selling products
app.get("/best-selling-products", async (req, res) => {
  const query = "SELECT * FROM products ORDER BY count DESC LIMIT 4";
  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching best-selling products:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get today’s deals
app.get("/today-deals", async (req, res) => {
  const query = "SELECT * FROM products ORDER BY discount DESC LIMIT 4";
  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching today’s deals:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get top-sold products
app.get("/top-sold-products", async (req, res) => {
  const query = "SELECT * FROM products ORDER BY count DESC LIMIT 4";
  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching top-sold products:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch product details by product ID
app.get("/products/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [
      productId,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch ingredients by product ID
app.get("/products/:id/ingredients", async (req, res) => {
  const productId = req.params.id;
  try {
    const result = await pool.query(
      "SELECT ingredient FROM product_ingredients WHERE id = $1",
      [productId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Ingredients not found" });
    }

    const ingredients = result.rows.map((row) => ({ name: row.ingredient }));
    res.json(ingredients);
  } catch (error) {
    console.error("Error fetching product ingredients:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Submit new review
app.post("/reviews", async (req, res) => {
  const { comment, user_name, product_id } = req.body;

  if (!comment || !user_name || !product_id) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    await pool.query(
      "INSERT INTO product_reviews (user_name, comment, id, likes, dislikes, rating) VALUES ($1, $2, $3, 0, 0, 5)",
      [user_name, comment, product_id]
    );

    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    console.error("Error inserting review:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Fetch reviews for a product
app.get("/products/:id/reviews", async (req, res) => {
  const productId = req.params.id;
  try {
    const result = await pool.query(
      "SELECT * FROM product_reviews WHERE id = $1", // 'id' here refers to the product ID
      [productId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Like a review
app.post("/reviews/:reviewId/like", async (req, res) => {
  const reviewId = req.params.reviewId;
  try {
    await pool.query(
      "UPDATE product_reviews SET likes = likes + 1 WHERE review_id = $1",
      [reviewId]
    );
    res.status(200).json({ message: "Like updated successfully" });
  } catch (error) {
    console.error("Error liking the review:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Dislike a review
app.post("/reviews/:reviewId/dislike", async (req, res) => {
  const reviewId = req.params.reviewId;
  try {
    await pool.query(
      "UPDATE product_reviews SET dislikes = dislikes + 1 WHERE review_id = $1",
      [reviewId]
    );
    res.status(200).json({ message: "Dislike updated successfully" });
  } catch (error) {
    console.error("Error disliking the review:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch all products for dashboard
app.get("/dashboard/products", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products"); // Ensure table name matches schema
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch inventory data
app.get("/dashboard/inventory", async (req, res) => {
  try {
    const query = `
      SELECT 
        p.id AS product_id,
        ps.sale_id,
        p.name AS product_name,
        p.price,
        p.count AS available_quantity,
        COALESCE(ps.quantity_sold, 0) AS quantity_sold,
        COALESCE(ps.total_sale_value, 0) AS total_sale_value
      FROM 
        products p
      LEFT JOIN 
        product_sales ps ON p.id = ps.product_id;
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching inventory data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

// const multer = require('multer');
// const path = require('path');

// First Multer configuration for file uploads
const storage1 = multer.diskStorage({
  destination: './public/assets/', // Save files to the public/assets directory
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Add timestamp to filename
  }
});

const upload1 = multer({
  storage: storage1,
  limits: { fileSize: 1000000 } // Limit file size to 1MB
}).single('image_url');

// Second Multer configuration for file uploads
const storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    const assetFolder = './public/assets'; // Define your asset folder
    cb(null, assetFolder); // Save to "public/assets" folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Save file with original name
  }
});

const upload2 = multer({ storage: storage2 }).single("image_url");


// // Multer configuration for file uploads
// const storage = multer.diskStorage({
//   destination: './public/assets/', // Save files to the public/assets directory
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Add timestamp to filename
//   }
// });

// // Initialize upload variable
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1000000 } // Limit file size to 1MB
// }).single('image_url');



// Endpoint to add products
app.post('/AddProducts', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: 'File upload error' });
    }

    const { name, info, price, count, discount, added_date } = req.body;
    const imageUrl = req.file ? `/assets/${req.file.filename}` : ''; // Save relative path

    if (!name) {
      return res.status(400).json({ success: false, message: 'Product name is required' });
    }

    try {
      const query = `
        INSERT INTO products (name, info, price, image_url, count, discount, added_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
      `;
      const values = [name, info, price, imageUrl, count, discount, added_date];
      const result = await pool.query(query, values);
      res.status(201).json({ success: true, product: result.rows[0] });
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });
});

// user signin
app.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  console.log("Login request received:", req.body);

  try {
    // Check if the user exists
    const userQuery = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    const user = userQuery.rows[0];

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If passwords are hashed, compare using bcrypt
    const isPasswordValid = password === user.password; // For plaintext passwords
    // const isPasswordValid = await bcrypt.compare(password, user.password); // For hashed passwords

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // // Optional: Generate JWT for authenticated sessions
    // const token = jwt.sign(
    //   { id: user.id, username: user.username, role: user.role },
    //   "your_secret_key", // Replace with an environment variable for security
    //   { expiresIn: "1h" }
    // );

    console.log("User logged in:", user);
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      } // Optional: Send the JWT to the client
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Query to fetch user from the database
    const query = "SELECT * FROM users WHERE username = $1";
    const values = [username];
    const result = await pool.query(query, values);

    if (result.rows.length > 0) {
      const user = result.rows[0];

      // Assuming passwords are stored in plain text (not recommended; you should hash passwords)
      const passwordMatch = user.password === password;

      if (passwordMatch) {
        // Prepare response with role-based redirect URLs
        const responseData = {
          message: 'Login successful',
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            username: user.username,
            role: user.role,
          },
          redirectUrl:
            user.role === 'superadmin'
              ? '/superadmin-dashboard'
              : user.role === 'admin'
              ? '/dashboard'
              : '/products',
        };

        res.json(responseData);
      } else {
        res.status(401).json({ message: 'Invalid username or password' });
      }
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error("Error querying database:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Delete product by ID
app.delete("/DeleteProduct/:id", async (req, res) => {
  const productId = req.params.id;
  console.log("Product ID to delete:", productId);
  try {
    // Delete from `products` table
    const result = await pool.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [productId]
    );

    // Delete related entries from `product_ingredients` table
    const result2 = await pool.query(
      "DELETE FROM product_ingredients WHERE id = $1 RETURNING *",
      [productId]
    );

    if (result.rowCount === 0 && result2.rowCount === 0) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error, could not delete product." });
  }
});

// User signup
app.post("/signup", async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  console.log("Signup request received:", req.body);

  if (password.trim() !== confirmPassword.trim()) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Check if the user already exists
    const userCheck = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Insert new user
    const newUser = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, password]
    );

    console.log("User created:", newUser.rows[0]);
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser.rows[0] });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Fetch user by ID
app.get("/user/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await pool.query(
      "SELECT username, email, address FROM users WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Reset password
app.post("/reset-password", async (req, res) => {
  const { username, newPassword } = req.body;
  console.log("Password reset request for username:", username);

  try {
    const result = await pool.query(
      "UPDATE users SET password = $1 WHERE username = $2 RETURNING *",
      [newPassword, username]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Server error, could not update password" });
  }
});

// Place an Order
app.post("/orders", async (req, res) => {
  const {
    user_id, // Add user_id if required for tracking orders by user
    product_id,
    quantity,
    total_price,
    payment_method,
    tracking_id,
    delivery_date,
    address, // Optional: Include if delivery requires an address
    order_date, // Optional: Include if the order date needs to be recorded
  } = req.body;

  // Validate required fields
  if (!product_id || !quantity || !total_price || !payment_method) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Start a transaction
    await pool.query("BEGIN");

    // Check product stock
    const countQuery = "SELECT count FROM products WHERE id = $1";
    const countResult = await pool.query(countQuery, [product_id]);

    if (countResult.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const currentCount = countResult.rows[0].count;

    // Validate stock availability
    if (currentCount < quantity) {
      return res.status(400).json({ message: "Insufficient stock for this order" });
    }

    // Update product stock
    const newCount = currentCount - quantity;
    const updateCountQuery = "UPDATE products SET count = $1 WHERE id = $2";
    await pool.query(updateCountQuery, [newCount, product_id]);

    // Insert the order
    const orderQuery = `
      INSERT INTO orders (user_id, product_id, quantity, total_price, payment_method, tracking_id, delivery_date, address, order_date)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;
    const orderValues = [
      user_id,
      product_id,
      quantity,
      total_price,
      payment_method,
      tracking_id,
      delivery_date,
      address,
      order_date,
    ];
    const orderResult = await pool.query(orderQuery, orderValues);

    // Commit the transaction
    await pool.query("COMMIT");

    // Low-stock alert
    if (newCount < 5) {
      console.log(`Alert: Product ID ${product_id} stock is below threshold!`);
    }

    // Return the created order
    res.status(201).json(orderResult.rows[0]);
  } catch (error) {
    // Rollback the transaction on error
    await pool.query("ROLLBACK");
    console.error("Error processing order:", error);
    res.status(500).json({ message: "Error saving order details" });
  }
});

// Fetch low-stock products
app.get("/api/low-stock", async (req, res) => {
  try {
    const query = "SELECT id, count AS stock FROM products WHERE count < $1";
    const threshold = 5; // Define your low stock threshold
    const result = await pool.query(query, [threshold]);

    // Return the list of low-stock products
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching low stock products:", error);
    res.status(500).json({ message: "Error fetching low stock products" });
  }
});

// Fetch aggregated orders
app.get("/api/orders", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        products.name AS product_name, 
        SUM(orders.total_price) AS total_price, 
        SUM(orders.quantity) AS total_quantity,
        orders.payment_method
      FROM orders
      JOIN products ON orders.product_id = products.id
      GROUP BY products.name, orders.payment_method
      ORDER BY product_name ASC;
    `);

    // Return aggregated order data
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching aggregated orders:", error);
    res.status(500).send("Error fetching aggregated orders");
  }
});

// Get all users
app.get("/api/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send("Error fetching users");
  }
});

// Update product (count or discount)
app.patch("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const { count, discount } = req.body;

  try {
    // Initialize query and values
    let query = "UPDATE products SET ";
    const updates = [];
    const values = [];

    // Dynamically build the query
    if (count !== undefined) {
      updates.push(`count = $${updates.length + 1}`);
      values.push(count);
    }
    if (discount !== undefined) {
      updates.push(`discount = $${updates.length + 1}`);
      values.push(discount);
    }

    if (updates.length === 0) {
      return res.status(400).json({ message: "No fields provided to update" });
    }

    // Finalize query
    query += updates.join(", ") + ` WHERE id = $${updates.length + 1} RETURNING count, discount`;
    values.push(id);

    // Execute query
    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      updatedProduct: result.rows[0],
    });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ message: "Error updating product" });
  }
});

// Get all customers (excluding admin roles)
app.get("/api/customers", async (req, res) => {
  try {
    const query = `
      SELECT 
        id, 
        username, 
        email 
      FROM users
      WHERE role NOT IN ('superadmin', 'admin')
      ORDER BY username;
    `;
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching customer data:", err);
    res.status(500).json({ message: "Error fetching customer data" });
  }
});
// const express = require("express");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const pool = require("./db"); // Assuming you have configured your database pool

// const app = express();
app.use(express.json());

// Serve static files from the "public" folder
app.use(express.static("public"));

// Ensure "public/assets" folder exists
const assetFolder = path.join(__dirname, "public/assets");
if (!fs.existsSync(assetFolder)) {
  fs.mkdirSync(assetFolder, { recursive: true });
  console.log("Created 'public/assets' folder.");
} else {
  console.log("'public/assets' folder already exists.");
}

// // Configure multer storage for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, assetFolder); // Save to "public/assets" folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname); // Save file with original name
//   },
// });

// const storage = multer({ storage }).single("image_url");

// Endpoints

// Add a User
app.post("/api/user", async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const query = `
      INSERT INTO users (username, email, password, role) 
      VALUES ($1, $2, $3, $4) RETURNING *;
    `;
    const values = [username, email, password, role];
    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]); // Send the created user as response
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Failed to add user." });
  }
});

// Add a Product to the Cart
app.post("/cart", async (req, res) => {
  const { product_id, product_name, quantity, price, user_id } = req.body;
  try {
    await pool.query(
      "INSERT INTO cart (product_id, product_name, quantity, price, user_id) VALUES ($1, $2, $3, $4, $5)",
      [product_id, product_name, quantity, price, user_id]
    );
    res.status(201).json({ message: "Product added to cart" });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ error: "Failed to add product to cart" });
  }
});

// Get Cart Items for a User
app.get("/cart/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const result = await pool.query(
      `
      SELECT c.cart_id, c.user_id, c.quantity, c.price, 
             p.name, p.image_url
      FROM cart c
      JOIN products p ON c.product_id = p.id
      WHERE c.user_id = $1
      ORDER BY c.created_at DESC;
    `,
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Failed to fetch cart" });
  }
});

// Delete Product from Cart
app.delete("/cart/:cartId", async (req, res) => {
  const cartId = req.params.cartId;
  try {
    await pool.query("DELETE FROM cart WHERE cart_id = $1", [cartId]);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({ message: "Failed to delete cart item" });
  }
});

// Update Cart Item Quantity
app.put("/cart/:id", async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  try {
    await pool.query("UPDATE cart SET quantity = $1 WHERE cart_id = $2", [
      quantity,
      id,
    ]);
    res.json({ message: "Quantity updated" });
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    res.status(500).json({ message: "Failed to update quantity" });
  }
});

// Add a Product with Image Upload
app.post("/AddProducts", (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Multer file upload error:", err);
      return res.status(400).json({ success: false, message: "File upload error" });
    }

    const { name, info, price, count, discount, added_date } = req.body;
    const imageUrl = req.file ? `/assets/${req.file.originalname}` : "";

    if (!name) {
      return res.status(400).json({ success: false, message: "Product name is required" });
    }

    try {
      const query = `
        INSERT INTO products (name, info, price, image_url, count, discount, added_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
      `;
      const values = [name, info, price, imageUrl, count, discount, added_date];
      const result = await pool.query(query, values);

      res.status(201).json({ success: true, product: result.rows[0] });
    } catch (error) {
      console.error("Error adding product to database:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });
});


// Route to check if user is authenticated
// Route to check if the user is authenticated
app.get("/api/auth/check", async (req, res) => {
  const { userId } = req.query; // Getting the userId from query parameters

  if (!userId) {
    return res.status(400).json({ isAuthenticated: false });
  }

  try {
    // Query to check if user exists in the database
    const result = await pool.query("SELECT id FROM users WHERE id = $1", [userId]);

    // If a user is found, return isAuthenticated: true
    if (result.rows.length > 0) {
      return res.json({ isAuthenticated: true });
    } else {
      return res.json({ isAuthenticated: false });
    }
  } catch (error) {
    console.error("Error checking user authentication:", error);
    return res.status(500).json({ isAuthenticated: false });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
