const express = require('express');
const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = 3001;
// Database connection configuration
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Endpoint to get products
app.get('/products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products;');
        console.log('inside try');
        console.log(result.rows);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});
console.log('jas');
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
