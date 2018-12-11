const express = require('express');

const JobController = require('../controllers/job.controller');
const router = express.Router();

router.route('/')
.get(JobController.getJobs);

router.post('/:employerId', JobController.createJob);
router.patch('/:seekerId', JobController.applyJob);

router.route('/:jobId')
.get(JobController.getJob)
.patch(JobController.updateJob)
.delete(JobController.deleteJob);

module.exports = router;