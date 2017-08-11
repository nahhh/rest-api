var express = require('express');
var router = express.Router();

// controlles
const userController = require('../controllers/userController');

/* Get list users. */
router.get('/users', userController.getListUser);

/* Get user by id. */
router.get('/user/:id', userController.getUser);

module.exports = router;
