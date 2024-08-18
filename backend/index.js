const express = require('express');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;
const connectDb = require('./config/db');
const e = require('express');

connectDb();
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', require('./routes/userRoutes'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});