const fs = require('fs');

let genres = ['animation', 'comedy', 'documentary', 'horror', 'romance'];

function countReviews(dirname, genre) {
  let countRegex = /Review Count: \d/;
  let sum = 0;
  fs.readdir(dirname, (err, filenames) => {
    filenames.forEach(filename => {
      let content = fs.readFileSync(dirname + filename, 'utf8');
      let matches = countRegex.exec(content);
      let words = matches[0].split(' ');
      let count = parseInt(words[words.length - 1]);
      sum += count;
      });
      console.log(`Total Reviews for ${genre}: `, sum);
    });
}

genres.forEach(genre => countReviews(`./reviews-genre/all-reviews/${genre}/`, genre));

