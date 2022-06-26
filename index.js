require('dotenv').config()

const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');

const PORT = process.env.PORT || 8000;
const app = express();

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

// Import Routes

const upcomingMoviesRoute = require('./routes/upcomingMovies');

const BASE_URL = 'https://www.imdb.com';
const fetchSource = {
    upcomingMovies: 'https://www.imdb.com/india/upcoming/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=e18838a9-59b3-4b0d-b04c-99ccab037856&pf_rd_r=JSTG63ER3VPTK69ZNQ4V&pf_rd_s=center-4&pf_rd_t=60601&pf_rd_i=india.trending&ref_=fea_india_ss_trending_tp_sm',

}

// Middleware


// ROUTES
app.use('/upcomingMovies', upcomingMoviesRoute);




// HOME SCREEN
app.get('/', (req, res) => {
    res.send('Welcome to the IMDB API.');
});

