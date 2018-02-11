const fs = require('fs');

let genre = 'comedy';
let dirname = `./reviews-genre/all-reviews/${genre}/`;

let emptyRegex = /Review Count: 0/g;

fs.readdir(dirname, function(err, filenames) {
  filenames.forEach(function(filename) {
    let fullpath = dirname + filename;
    fs.readFile(fullpath, 'utf-8', function(err, content) {
      if (emptyRegex.test(content)) {
        console.log('deleting', fullpath);
        fs.unlinkSync(fullpath);
      }
    });
  });
});
