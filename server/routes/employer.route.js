const express = require('express');

const EmployerController = require('../controllers/employer.controller');
const router = express.Router();

router.route('/')
.get(EmployerController.getEmployers)
.post(EmployerController.createEmployer);

router.route('/:id')
.get(EmployerController.getEmployerById)
.patch(EmployerController.updateEmployer)
.delete(EmployerController.deleteEmployer);

module.exports = router;