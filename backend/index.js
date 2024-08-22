const express = require('express');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;
const connectDb = require('./config/db');
const cookieParser = require('cookie-parser');

connectDb();
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productsRoutes'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});