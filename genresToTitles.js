require('dotenv').config();
const axios = require('axios')
    , fs = require('fs');

let genreIDs = {
    'adventure': 12,
    'action': 28,
    'animation': 16,
    'comedy': 35,
    'crime': 80,
    'documentary': 99,
    'drama': 18,
    'family': 10751,
    'fantasy': 14,
    'history': 36,
    'horror': 27,
    'music': 10402,
    'mystery': 9648,
    'romance': 10749,
    'sci-fi': 878,
    'tv-movie': 10770,
    'thriller': 53,
    'war': 10752,
    'western': 37
};

let reviewDirectory = './reviews-genre/titles';

// five genres considered
let genres = ['horror', 'comedy', 'animation', 'documentary', 'romance'];

function getAllTitles(genres) {
  let pageLimit = 1000;
  genres.forEach(genre => {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=${genreIDs[genre]}`)
         .then(res => {
            fs.appendFileSync(`${reviewDirectory}/${genre}_movie_titles.txt`, `Genre: ${genre}\tTotal Results: ${res.data.total_results < 20000 ? res.data.total_results : 20000}\n`);
            for (let i = 1; i <= pageLimit; i++) {
              setTimeout(() => getTitle(i, genre), i * 1050);
            }
         });
  });
}

function getTitle(page, genre) {
  let movieTitles = '';
  axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=${genreIDs[genre]}&page=${page}`)
       .then(res => {
          res.data.results.forEach(movie => {
            movieTitles += (movie.title.replace(/,/g, '') + ',\n');
          });  
          fs.appendFileSync(`${reviewDirectory}/${genre}_movie_titles.txt`, movieTitles);
      });
}

getAllTitles(genres);

