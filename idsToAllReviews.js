require('dotenv').config();
const axios = require('axios')
    , fs = require('fs')
    , cheerio = require('cheerio');

let titleDirectory = './reviews-genre/titles-with-ids';
let reviewDirectory = './reviews-genre/all-reviews';
let genre = 'horror';
// let genres = ['horror', 'comedy', 'animation', 'romance', 'documentary'];

// fs.mkdir(`${reviewDirectory}`, '0o777', err => console.log(err));
// fs.mkdir(`${reviewDirectory}/${genre}`, '0o777', err => console.log(err));

fs.readFile(`${titleDirectory}/${genre}_titles_with_ids.txt`, 'utf-8', (err, data) => {
  let titles = data.split('\n');
  let imdbIDs = titles.map(title => {
    let tokens = title.split(' ');
    return tokens[tokens.length - 1].replace(',', '');
  });
  // test on small list
  imdbIDs = imdbIDs.slice(0,250);
  imdbIDs.forEach((id, index) => {
    let baseUrl = `http://www.imdb.com/title/${id}/reviews/_ajax`;
    let reviewsTXT = '';
    let paginationKey = '';
    setTimeout(() => {
      console.log(`Dispatched request #${index + 1} for ${baseUrl}`);
      scrapeReviews(id, titles[index], baseUrl, paginationKey, reviewsTXT, 0);
    }, index * 250);
    // scrapeReviews(id, baseUrl, paginationKey, reviewsTXT, 0);
  });
});

function scrapeReviews(id, title, baseUrl, paginationKey, reviewsTXT, numReviews) {
  // console.log(baseUrl + paginationKey);
  axios.get(baseUrl + paginationKey)
       .then(res => {
          let $ = cheerio.load(res.data);
          $('.text').each((index, element) => {
            // remove all newlines and carriage returns
            // also get rating! -- maybe look at container itself?
            numReviews++;
            reviewsTXT += $(element).text().replace(/(\r\n|\n|\r)/gm,' ');
            reviewsTXT += '\n';
          });
          // set paginationKey if it exists
          paginationKey = $('.load-more-data').attr('data-key');
          if (paginationKey) {
            scrapeReviews(id, title, baseUrl, `?paginationKey=${paginationKey}`, reviewsTXT, numReviews);
          } else {
            reviewsTXT = `${baseUrl}\n${title}\nReview Count: ${numReviews}\n${reviewsTXT}`;
            fs.appendFile(`${reviewDirectory}/${genre}/${id}.txt`, reviewsTXT, err => {
              if (err) { 
                console.error(err);
              }
            });
          }
       })
       .catch(err => console.error(err));

}
