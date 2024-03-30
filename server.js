const express = require('express');
const axios = require('axios'); 
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Hi! This is my Anime API Viewer!',
        results: [], 
        query: ''
    });
});

//Generate random anime route
app.get('/random-anime', async (req, res) => {
    const response = await axios.get('https://api.jikan.moe/v4/random/anime');
    res.render('random-anime', { anime: response.data.data });
    console.log(response.data);
});

//Search for an anime route
app.get('/search-anime', async (req, res) => {
    const query = req.query.q; 
    const url = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}`;
    const response = await axios.get(url);
    const searchResults = response.data.data.slice(0, 15);
    res.render('index', { 
        title: 'Hi! This is my Anime API Viewer!', 
        results: searchResults, 
        query: query 
    });
});

//Get the top anime route
app.get('/top-anime', async (req, res) => {
    const response = await axios.get('https://api.jikan.moe/v4/top/anime');
    const topAnime = response.data.data; 
    res.render('top-anime', { topAnime: topAnime }); 
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
