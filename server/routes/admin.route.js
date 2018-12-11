const express = require('express');
const checkAuth = require('../middleware/check-auth');
const AdminController = require('../controllers/admin.controller');
const router = express.Router();

router.get('/', AdminController.getAdmins);

router.route('/:userId')
.post(AdminController.createAdmin)
.get(AdminController.getAdmin)
.patch(AdminController.updateAdmin)
.delete(AdminController.deleteAdmin);



module.exports = router;