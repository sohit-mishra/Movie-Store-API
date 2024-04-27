const mongoose = require('mongoose');

const MoviesScheme = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    Year: Number, 
    Director : String,
    Genre:[String],
    rating: {
        type: String,
        default: "N/A"
    }
})

const Movie = mongoose.model('Movie', MoviesScheme);
module.exports = Movie;