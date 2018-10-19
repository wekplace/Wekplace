const express = require('express');

const SeekerController = require('../controllers/seeker.controller');
const router = express.Router();

router.route('/')
.get(SeekerController.getSeekers)
.post(SeekerController.createSeeker);

router.route('/:id')
.get(SeekerController.getSeekerById)
.patch(SeekerController.updateSeeker)
.delete(SeekerController.deleteSeeker);

module.exports = router;