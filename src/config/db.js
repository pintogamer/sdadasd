// config/db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB: ', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;