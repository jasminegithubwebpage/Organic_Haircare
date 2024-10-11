const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
require("dotenv").config();
const multer = require('multer');
const app = express();
const port = 3002;
const path = require('path');
app.use(express.static('public'));
const bcrypt = require('bcrypt');

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
  // console.log("jas");
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
app.get("/trending-products", async (req, res) => {
  const query = "SELECT * FROM products ORDER BY  added_date desc limit 4";
  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get best-selling products
app.get("/best-selling-products", async (req, res) => {
  const query = "SELECT * FROM products ORDER BY count  DESC LIMIT 4";
  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get today’s deals
app.get("/today-deals", async (req, res) => {
  const query = "SELECT * FROM products ORDER BY discount   LIMIT 4";
  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
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
    console.error(err);
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

    const product = result.rows[0];
    // console.log("Product fetched from DB:", product); // Add this for debugging
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error); // Log the error for easier debugging
    res.status(500).json({ error: error.message });
  }
});


// app.get('/products/:id/ingredients', async (req, res) => {
//   const productId = req.params.id;
//   try {
//     const result = await pool.query(
//       'SELECT ingredient FROM product_ingredients WHERE id = $1',
//       [productId]
//     );
//     const ingredients = result.rows.map(row => ({ name: row.ingredient }));
//     console.log(ingredients);
//     res.json(ingredients);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
app.get('/products/:id/ingredients', async (req, res) => {
  const productId = req.params.id;
  try {
    const result = await pool.query(
      "SELECT ingredient FROM product_ingredients WHERE id = $1",
      [productId]
    );
    
    // Flatten the result to return individual ingredient objects
    const ingredients = result.rows.flatMap(row => 
      row.ingredient.map(ingredient => ({ name: ingredient }))
    );
    
    //console.log(ingredients);
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});





// //fetch the review
// app.get("/products/:id/reviews", async (req, res) => {
//   const productId = req.params.id;
//   try {
//     const result = await pool.query(
//       "SELECT * FROM product_reviews WHERE id = $1",
//       [productId]
     
//     );
//     console.log(result.rows);
//     res.json(result.rows);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
// Submit new review
app.post("/reviews", async (req, res) => {
  const { comment, user_name, product_id } = req.body; // Ensure product_id is passed
  console.log(product_id);
  try {
    await pool.query(
      "INSERT INTO product_reviews (user_name, comment, id, likes, dislikes, rating) VALUES ($1, $2, $3, 0, 0, 5)", // Ensure product_id is correctly named
      [user_name, comment, product_id] // Save product_id in the correct position
    );

    res.status(201).send("Review added successfully");
  } catch (error) {
    console.error("Error inserting review:", error);
    res.status(500).send("Error adding review");
  }
});


//fetch review
// Fetch the reviews for a product
app.get("/products/:id/reviews", async (req, res) => {
  const productId = req.params.id;
  try {
    const result = await pool.query(
      "SELECT * FROM product_reviews WHERE id = $1", // id refers to the product_id here
      [productId]
    );
    //console.log(result.rows);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Like a review
app.post("/reviews/:reviewId/like", async (req, res) => {
  await pool.query(
    "UPDATE product_reviews SET likes = likes + 1 WHERE review_id = $1",
    [req.params.reviewId]
  );
  res.send("Like updated");
});

// Dislike a review
app.post("/reviews/:reviewId/dislike", async (req, res) => {
  await pool.query(
    "UPDATE product_reviews SET dislikes = dislikes + 1 WHERE review_id = $1",
    [req.params.reviewId]
  );
  res.send("Dislike updated");
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


// Endpoint to fetch products
app.get('/dashboard/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products'); // Adjust table name if necessary
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/dashboard/inventory', async (req, res) => {
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
    //console.log(result.rows);
  } catch (error) {
    console.error('Error fetching inventory data:', error); // Log error details
    res.status(500).send('Server Error');
  }
});

const storage = multer.diskStorage({
  destination: './public/assets/', // Save to the public/assets directory
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Add timestamp to the filename
  }
});


// Initialize upload variable
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit file size to 1MB
}).single('image_url');

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


app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Query to fetch user from the database
    const query = 'SELECT * FROM users WHERE username = $1 AND password = $2';
    const values = [username, password];
    const result = await pool.query(query, values);

    if (result.rows.length > 0) {
      const user = result.rows[0];

      // Check the role and send the corresponding redirect URL
      if (user.role === 'superadmin') {
        res.json({ message: 'Login successful', role: 'superadmin', redirectUrl: '/superadmin-dashboard' });
      } else if (user.role === 'admin') {
        res.json({ message: 'Login successful', role: 'admin', redirectUrl: '/dashboard' });
      } else if (user.role === 'user') {
        res.json({ message: 'Login successful', role: 'user', redirectUrl: '/products' });
      } else {
        res.status(401).json({ message: 'Invalid role or unauthorized user' });
      }
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Delete product by ID
app.delete('/DeleteProduct/:id', async (req, res) => {
  const productId = req.params.id;
  console.log('ID IS DELETED ROUTE');
  try {
    // Query to delete the product by ID
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [productId]);
    const result2 = await pool.query('DELETE FROM  product_ingredients WHERE id = $1 RETURNING *', [productId]);
    if (result.rowCount === 0 && result2.count===0) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.status(200).json({ message: 'Product deleted successfully.' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server error, could not delete product.' });
  }
});




app.post('/signup', async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  console.log('signup server');

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    // Check if user already exists
    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = await pool.query(

    // Insert new user into the database (without password hashing)
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, password] // Store password as plain text
    );

    res.status(201).json({ message: 'User created successfully', user: newUser.rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


