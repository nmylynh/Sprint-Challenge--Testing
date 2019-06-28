const express = require('express');
const server = express();
const configureMiddleware = require('./middleware/config-mw');
const games = require('./routers/games-router');

configureMiddleware(server);

server.get('/', (req, res) => {
    res.status(200).json({ message: 'HELLO THIS IS PATRICK' });
  });  


server.use('/api/games', games);

module.exports = server;