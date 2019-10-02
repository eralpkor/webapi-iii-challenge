const express = require('express');
const User =require('./userDb.js');
const middleware = require('../middleware/middleware.js');

const router = express.Router();

// add new user
router.post('/', (req, res) => {
  const { name } = req.body;
  console.log(req.body)
  User.insert({name})
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Error adding user...'})
    })
});

// post new posts
router.post('/:id/posts', (req, res) => {

});
// GET all users
router.get('/', (req, res) => {
  User.get()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Cannot fetch users...' })
    })
});
// GET user by their id
router.get('/:id', middleware.validateId, (req, res) => {
  // const { id } = req.params;
  res.status(200).json(req.user);
  // User.getById(id)
  //   .then(user => {
  //     user ? res.status(200).json(user) : res.status(404).json({ error: `User with ID ${id} does not exist.`})
  //   })
});

// get user posts
router.get('/:id/posts', middleware.validateId, (req, res) => {
  const { id } = req.params;
  User.getUserPosts(id)
    .then(post => res.status(200).json(post))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: `Error getting user with ID ${id} posts...`})
    })
});

// Delete user by id
router.delete('/:id', middleware.validateId, (req, res) => {
  const { id } = req.params;
  User.remove(id)
    .then(() => res.status(204).end())
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: `Error deleting user with ${id}`})
    })
});

// Edit user
router.put('/:id', middleware.validateId, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  
  User.update(id, { name })
    .then(updatedUser => {
      if (updatedUser) {
        User.getById(id)
          .then(user => res.status(200).json(user))
          .catch(err => {
            console.log(err);
            res.status(500).json({error: `Error getting user ID ${id}`});
          })
      }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: `Error updating...`});
  })
});




//custom middleware

// function validateIdUserId(req, res, next) {
//   const { id } = req.params;
//   User.getById(id)
//     .then(user => {
//       if (user) {
//         next();
//       } else {
//         res.status(404).json({ error: `User with ID ${id} does not exist`})
//       }
//     })
// };

function validateIdUser(req, res, next) {

};

function validateIdPost(req, res, next) {

};

module.exports = router;
