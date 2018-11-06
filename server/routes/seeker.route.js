const express = require('express');

const SeekerController = require('../controllers/seeker.controller');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

router.route('/')
.get(SeekerController.getSeekers);

router.route('/:userId')
.post(SeekerController.createSeeker)
.get(SeekerController.getSeeker)
.patch(SeekerController.updateSeekerUserId)
.delete(SeekerController.deleteSeekerUserId);

router.route('/:userId/profile')
.post(SeekerController.setSeekerProfile)

router.route('/:userId/skills')
.post(SeekerController.setSeekerSkills);

router.route('/:userId/expectations')
.post(SeekerController.setSeekerExpections);

module.exports = router;