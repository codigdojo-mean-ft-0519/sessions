const { AuthController } = require('../controllers');
const router = require('express').Router();

module.exports = router
  // /api/auth/login
  .post('/login', AuthController.login)
  .post('/register', AuthController.register)
  // deleting session
  .delete('/logout', AuthController.logout);
