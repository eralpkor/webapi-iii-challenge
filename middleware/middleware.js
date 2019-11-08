// Custom middlewares
const User =require('../users/userDb.js');

var time = new Date();
var timestamp = time.toLocaleString();

function logger(req, res, next) {
  console.log(`\nMethod: ${req.method} \nURL: ${req.url} \nTime: ${timestamp}`);

  next();
}

function validateId(req, res, next) {
  const { id } = req.params;
  User.getById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({ error: `User with ID ${id} does not exist`})
      }
    })
}

function validateUser(req, res, next) {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Please enter a name...'});
  }
  if (typeof name !== 'string') {
    return res.status(400).json({ error: 'Name must be string...'});
  }
  
  next();
}

function validatePost(req, res, next) {
  const { id: user_id } = req.params;
  const { text } = req.body;

  if (!req.body) {
    return res.status(400).json({ error: "Please enter something..."});
  }
  if (!text) {
    return res.status(400).json({ error: "Please enter something..."});    
  }
  req.body = {user_id, text };
  next();
}

module.exports = {
  logger,
  validateId,
  validateUser,
  validatePost
}

// {
//   "id": 39,
//   "text": "Hellotqqqt adgaga",
//   "user_id": 21
// }