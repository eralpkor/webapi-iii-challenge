const express = require('express');
const middleware = require('./middleware/middleware.js');
const helmet = require('helmet');
const cors = require('cors');

const userRouter = require('./users/userRouter.js');

const server = express();

//custom middleware
server.use(middleware.logger);
server.use(helmet());
server.use(express.json());
server.use(cors({
  origin: 'http://localhost:3000/'
}));

server.use('/api/users' ,userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});


module.exports = server;
