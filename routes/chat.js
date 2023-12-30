const router = require("express").Router();
const chatController = require("../controllers/chat_controller")
const { verifyToken, verifyAndAuthorization } = require("../middleware/verifyToken")

// CREATE CHAT 
router.post('/', verifyToken, chatController.accessChat)
// router.post('/', verifyAndAuthorization, chatController.accessChat)


// Get CHAT
router.get('/', verifyToken, chatController.getChat)
// router.get('/', verifyAndAuthorization, chatController.getChat)

module.exports = router