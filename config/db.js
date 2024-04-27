const mongoose = require('mongoose');
require('dotenv').config(); 
const url = process.env.MONGODBURI; 


const connectToDatabase = () => {
  mongoose.connect(url) 
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });
};

module.exports = connectToDatabase; 
