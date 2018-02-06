require('dotenv').config();
const fs = require('fs')
    , axios = require('axios');


function sendRequest(title, genre) {
  const omdbApiKey = process.env.OMDB_API_KEY
      , omdbBaseUrl = 'http://www.omdbapi.com/';
  axios.get(`${omdbBaseUrl}?apikey=${omdbApiKey}&t=${title}`)
        .then(response => {
          if (response.data.imdbID) {
            let title = response.data.Title.replace(/,/g, '');
            fs.appendFile(`./reviews-genre/titles-with-ids/${genre}_titles_with_ids.txt`, `${title} ${response.data.imdbID},\n`, err => console.error(err));
          }
        })
        .catch(err => console.error(err));
}

function getIDs(genres) {
  genres.forEach(genre => {
    fs.readFile(`./reviews-genre/titles/${genre}_movie_titles.txt`, 'utf-8', (err, data) => {
      let titles = data.split(',');
      // remove non-english titles here
      titles = titles.map(title => title.toLowerCase().replace(/[^\x00-\x7F]/g, '').replace(/[-:']/g, '').replace(/\s/g, '%20'));
      titles.forEach((title, index) => {
        setTimeout(() => sendRequest(title, genre), index * 400);
      })
    });
  });
}

let genres = ['animation', 'romance', 'comedy', 'horror', 'documentary'];
getIDs(genres);
