// run `node index.js` in the terminal
var http = require('http');
var request = require('request');
var fns = {};

http
  .createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Hello World!');
    fns
      .mypromise()
      .then((s) => {
        console.log('a', s);
      })
      .catch((c) => {
        console.log('Catch Error', c);
      });
    res.end();
  })
  .listen(8080);

fns.mypromise = async function (req, res) {
  var url1 = 'https://jsonplaceholder.typicode.com/todos/1';
  var url2 = 'https://jsonplaceholder.typicode.com/todos/2';
  var url3 = 'https://jsonplaceholder.typicode.com/todos/3';

  const a1 = new Promise((resolve, reject) => {
    request(url1, function (e, r, b) {
      if (e) {
        reject(e);
      } else {
        resolve(JSON.parse(b));
      }
    });
  });

  const a2 = new Promise((resolve, reject) => {
    request(url2, function (e, r, b) {
      if (e) {
        reject(e);
      } else {
        resolve(JSON.parse(b));
      }
    });
  });

  const a3 = new Promise((resolve, reject) => {
    request(url3, function (e, r, b) {
      if (e) {
        reject(e);
      } else {
        resolve(b);
      }
    });
  });

  return await Promise.all([a1, a2, a3]);
};
