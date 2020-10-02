// server.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.

    const parsedUrl = parse(req.url, true);
    // const { pathname, query } = parsedUrl;
    // if (pathname === '/error/404') {
    //   app.render(req, res, '/export/404', query);
    // } else {
    //   handle(req, res, parsedUrl);
    // }

    handle(req, res, parsedUrl);
  }).listen(8888, err => {
    if (err) throw err;
    console.log('> Ready on http://localhost:8888');
  });
});
