const express = require('express');
const CONFIG = require('../config/config');

const SeekerController = require('../controllers/seeker.controller');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

router.route('/')
.get(SeekerController.getSeekers);

router.route('/:userId')
.post(SeekerController.createSeeker)
.get(SeekerController.getSeekerByUserId)
.patch(SeekerController.updateSeekerUserId)
.delete(SeekerController.deleteSeekerUserId);

router.route('/:userId/profile')
.post(SeekerController.createSeekerProfileByUserId)
.get(SeekerController.getSeekerProfileByUserId);

router.route('/:userId/skills')
.post(SeekerController.createSeekerSkillsByUserId)
.get(SeekerController.getSeekerSkillsByUserId);

router.route('/:userId/expectations')
.post(SeekerController.createSeekerExpectionsByUserId)
.get(SeekerController.getSeekerExpectationsByUserId);

// router.route('/:id')
// .get(SeekerController.getSeekerById)
// .patch(SeekerController.updateSeeker)
// .delete(SeekerController.deleteSeeker);

module.exports = router;