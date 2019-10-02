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

module.exports = {
  logger,
  validateId
}