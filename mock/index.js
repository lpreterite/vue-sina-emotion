const path = require('path');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, './db.json'));
const middlewares = jsonServer.defaults();
const emotions = require('./emotions.json');

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.get('/emotions', (req, res, next) => {
    const body = emotions;
    res.status(200).send(body);
});

// Use default router
server.use(router);

server.listen(8881, () => {
    console.log('JSON Server is running at http://localhost:8881');
});