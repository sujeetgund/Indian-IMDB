const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const router = express.Router();

const BASE_URL = 'https://www.imdb.com';
const fetchSource = {
    upcomingMovies: 'https://www.imdb.com/india/upcoming/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=e18838a9-59b3-4b0d-b04c-99ccab037856&pf_rd_r=JSTG63ER3VPTK69ZNQ4V&pf_rd_s=center-4&pf_rd_t=60601&pf_rd_i=india.trending&ref_=fea_india_ss_trending_tp_sm',

};

const upcomingMovies = [];
router.get('/', (req, res) => {
    axios.get(fetchSource.upcomingMovies).then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const last_updated = $('span.ranking-last-update-time')
        $('div.trending-list-rank-items-container').each(function () {
            for (let i = 1; i < 10; i++) {

                const title = $(this).find(`span#trending-list-rank-item-name-${i}`).children('a').text()
                const url = $(this).find(`span#trending-list-rank-item-name-${i}`).children('a').attr('href')
                const popularity = $(this).find(`span#trending-list-rank-item-share-${i}`).text()
                const poster = $(this).find(`span.trending-list-rank-item-image`).css()
                console.log(poster)

                upcomingMovies.push({
                    title,
                    url: BASE_URL + url,
                    popularity
                })
            }
        });
        res.json(upcomingMovies);

        // console.log(last_updated)

    }).catch(err => {
        console.log(err);
        res.json(err)
    });
})


module.exports = router;