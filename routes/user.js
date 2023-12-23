const router = require('express').Router();
const userController = require('../controllers/user_controller');
const {verifyAndAuthorization, verifyToken, verifyIsAdmin} = require('../middleware/verifyToken')


// Update user
router.put('/',verifyAndAuthorization, userController.updateUser);

// Delete User
router.delete('/',verifyAndAuthorization, userController.deleteUser);

// Get User
router.get('/',verifyAndAuthorization, userController.getUser);

// Get User
router.get('/',verifyIsAdmin, userController.getAllUsers);

module.exports = router