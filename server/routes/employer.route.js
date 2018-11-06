const express = require('express');

const EmployerController = require('../controllers/employer.controller');
const router = express.Router();

router.get('/', EmployerController.getEmployers);
router.post('/:userId/profile',EmployerController.setEmployerProfile);
router.patch('/:userId/push', EmployerController.pushToEmployer);
router.patch('/:userId/pull', EmployerController.pullFromEmployer);

router.route('/:userId')
.post(EmployerController.createEmployer)
.get(EmployerController.getEmployer)
.patch(EmployerController.updateEmployer)
.delete(EmployerController.deleteEmployer);

router.route

module.exports = router;