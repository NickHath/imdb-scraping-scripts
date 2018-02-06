// let numReviews = 0
//   , paginationKey = ''
//   , baseUrl = `http://www.imdb.com/title/${req.params.id}/reviews/_ajax`
//   , reviewsTXT = '';

const fs = require('fs');

fs.mkdir('./movie-reviews-by-genre', '0o777', err => console.log(err));
fs.mkdir('./movie-reviews-by-genre/animation', '0o777', err => console.log(err));
fs.mkdir('./movie-reviews-by-genre/animation/pos', '0o777', err => console.log(err));
fs.mkdir('./movie-reviews-by-genre/animation/neg', '0o777', err => console.log(err));

fs.readFile('./intermediate-csv/animation_imdb_ids.txt', 'utf-8', (err, data) => {
  let titles = data.split('\n');
  let imdbIDs = titles.map(title => console.log(title.split(',')[1]));
  console.log(imdbIDs);
});

// function scrapeReviews(url) {
//   axios.get(url)
//         .then(response => {
//           let $ = cheerio.load(response.data);
//           $('.text').each((index, element) => {
//             // remove all newlines and carriage returns
//             reviewsTXT += $(element).text().replace(/(\r\n|\n|\r)/gm,' ');
//             numReviews++;
//           });
//           // set paginationKey if it exists
//           paginationKey = $('.load-more-data').attr('data-key');
//           if (paginationKey) {
//             scrapeReviews(`${baseUrlls}?paginationKey=${paginationKey}`);
//           } else {
//             res.status(200).send(numReviews + '\n' + reviewsTXT);
//           }
//         })
//         .catch(err => res.status(500).send(err));
//       }