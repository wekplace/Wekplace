const express = require('express');
const CONFIG = require('../config/config');

const EmployerController = require('../controllers/employer.controller');
const router = express.Router();

router.route('/')
.get(EmployerController.getEmployers)
.post(EmployerController.setEmployer);

router.route('/:userId')
.get(EmployerController.getEmployer)
.patch(EmployerController.updateEmployer)
.delete(EmployerController.deleteEmployer);

router.route('/:userId/profile')
.get(EmployerController.getEmployerProfile)
.post(EmployerController.setEmployer);

module.exports = router;