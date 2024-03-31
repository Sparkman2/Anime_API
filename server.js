const express = require('express');
const axios = require('axios'); 
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Hi! Come check out some anime!',
        results: [], 
        query: ''
    });
});

//Generate random anime route
app.get('/random-anime', async (req, res) => {
    let anime = null;
    do {
        const response = await axios.get('https://api.jikan.moe/v4/random/anime');
        if (response.data.data.rating !== 'Rx - Hentai') {
            anime = response.data.data;
        }
    } while (anime === null); 

    res.render('random-anime', { anime: anime});
});

//Search for an anime route
app.get('/search-anime', async (req, res) => {
    const query = req.query.q; 
    const url = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}`;
    const response = await axios.get(url);
    
    //Only getting the top 15 results
    const searchResults = response.data.data.slice(0, 15);
    res.render('index', { 
        title: 'Hi! Come check out some anime!', 
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
    console.log(`Server on ${PORT}`);
});

module.exports = app;