const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  fs.readFile('package.json', 'utf8', (err, data) => {
    if (err) {
      res.end('Error reading file');
    } else {
      res.end(data);
    }
  });
});

server.listen(3000)
