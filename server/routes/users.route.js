const express = require('express');
const CONFIG = require('../config/config');

const UserController = require('../controllers/user.controller');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

router.route('/')
.get(UserController.getUsers);

router.route('/:userId')
.get(UserController.getUserById)
.patch(UserController.updateUser)
.delete(UserController.deleteUser);

router.route('/login')
.post(UserController.loginUser);

router.route('/signup')
.post(UserController.signupUser);

// router.route('/:id')
// .get(SeekerController.getSeekerById)
// .patch(SeekerController.updateSeeker)
// .delete(SeekerController.deleteSeeker);

module.exports = router;