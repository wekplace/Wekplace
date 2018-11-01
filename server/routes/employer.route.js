const express = require('express');
const CONFIG = require('../config/config');

const EmployerController = require('../controllers/employer.controller');
const router = express.Router();

router.route('/')
.get(EmployerController.getEmployers)
.post(EmployerController.createEmployer);

router.route('/:id')
.get(EmployerController.getEmployerById)
.patch(EmployerController.updateEmployer)
.delete(EmployerController.deleteEmployer);

router.route('/signup')
.post(EmployerController.signupEmployer);

router.route('/login')
.post(EmployerController.loginEmployer);

module.exports = router;