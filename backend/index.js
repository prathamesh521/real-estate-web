const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const connectDb = require('./config/db');

const PORT = process.env.PORT || 5000;

// Connect to the database
connectDb();

const app = express();

// Middleware to parse JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

// Check if the "uploads" folder exists; if not, create it
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true }); // Ensure it creates the parent directories if needed
}

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(uploadsDir));

// Routes for API
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productsRoutes'));
app.use('/api/categories', require('./routes/categoriesRoutes'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
