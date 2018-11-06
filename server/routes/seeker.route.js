const express = require('express');

const SeekerController = require('../controllers/seeker.controller');
const router = express.Router();

router.get('/', SeekerController.getSeekers);
router.post('/:userId/profile',SeekerController.setSeekerProfile);
router.post('/:userId/skills',SeekerController.setSeekerSkills);
router.post('/:userId/expectations',SeekerController.setSeekerExpections);
router.patch('/:userId/push', SeekerController.pushToSeeker);
router.patch('/:userId/pull', SeekerController.pullFromSeeker);

router.route('/:userId')
.post(SeekerController.createSeeker)
.get(SeekerController.getSeeker)
.patch(SeekerController.updateSeeker)
.delete(SeekerController.deleteSeeker);

module.exports = router;