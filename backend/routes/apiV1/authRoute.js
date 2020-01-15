const { Router } = require('express');
const { Auth } = require('../../middleware/Auth');
const employees = require('../../controllers/employees');
const roles = require('../../controllers/roles');
const userRoles = require('../../controllers/gifs');

const router = new Router();

router.post('/supr', Auth.isSuperAdmin, employees.createBare);
router.post('/create-user', Auth.verifyToken, Auth.isAdmin, employees.createBare);
router.delete('/delete-user', Auth.verifyToken, Auth.isAdmin, employees.deleteBare);
router.post('/sign-in', employees.signin);
router.post('/create-roles', Auth.verifyToken, Auth.isAdmin, roles.create);
router.post('/create-userroles', Auth.verifyToken, Auth.isAdmin, userRoles.create);

module.exports = router;
