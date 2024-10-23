// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://phforner:xLTXUI5c3STGO2wG@cadastro.ip0tf.mongodb.net/?retryWrites=true&w=majority&appName=Cadastro");
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB: ', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;