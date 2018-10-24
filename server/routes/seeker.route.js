const express = require('express');
const CONFIG = require('../config/config');

const SeekerController = require('../controllers/seeker.controller');
const checkAuth = require('../middleware/check-auth')(CONFIG.auth_type_seeker);
const router = express.Router();

router.route('/')
.get(checkAuth, SeekerController.getSeekers)
.post(SeekerController.createSeeker); // This is only available to super Admin

router.route('/:id')
.get(SeekerController.getSeekerById)
.patch(SeekerController.updateSeeker)
.delete(SeekerController.deleteSeeker);

router.route('/signup')
.post(SeekerController.signupSeeker)

router.route('/login')
.post(SeekerController.loginSeeker)

module.exports = router;