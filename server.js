const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;
const Movies = require('./model/Movies');
const connectToDatabase = require('./config/db');

app.use(express.json());

connectToDatabase();

app.get('/', (req, res) => {
    res.status(200).send('Hello World');
});

app.get('/movies', async (req, res) => {
    try {

        let query = {};
       
        if (req.query.title) {
            query.title = { $regex: req.query.title, $options: 'i' };
        }

        if (req.query.rating) {
            query.rating = req.query.rating;
        }

        if (req.query.q) {
            query.title = { $regex: req.query.q, $options: 'i' };
        }


        let sort = {};
        if (req.query.sortBy) {
            sort[req.query.sortBy] = 1;
        }
        const movies = await Movies.find(query).sort(sort);
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.post('/movies', async (req, res) => {
    try {
        const movie = new Movies(req.body);
        await movie.save();
        res.status(201).json(movie);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
})

app.put('/movies/:id', async (req, res) => {
    try {
        const movie = await Movies.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json(movie);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
})

app.delete('/movies/:id', async (req, res) => {
    try {
        const movie = await Movies.findByIdAndDelete(req.params.id);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json({ message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
})

app.listen(PORT, (error) => {
    if (error) {
        console.error('Error starting the server:', error);
    } else {
        console.log('Server is running on port', PORT);
    }
});
