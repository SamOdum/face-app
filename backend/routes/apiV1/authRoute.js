const { Router } = require('express');
const { Auth } = require('../../middleware/Auth');
const users = require('../../controllers/Users');

const router = new Router();

router.post('/supr', Auth.isSuperAdmin, users.create);
router.post('/signup', users.create);
router.delete('/delete-user', Auth.verifyToken, Auth.isAdmin, users.delete);
router.post('/login', users.login);

module.exports = router;
