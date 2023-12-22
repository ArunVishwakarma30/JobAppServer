const router = require("express").Router();
const bookmarkController = require('../controllers/bookmark_controller');
const {verifyToken, verifyAndAuthorization} = require("../middleware/verifyToken")

// Create Boolmark
router.post('/', verifyAndAuthorization, bookmarkController.createBookmark)

// Delete Bookmark
router.delete('/:id',  bookmarkController.deleteBookmark)

// Get Bookmark
router.get('/:userId',  bookmarkController.getBookmarks)
// this get book mark is taking userID, 
// beacause suppose we have 200 bookmarks of all the user in our database,
// and only 16 bookmarks are belong to the particular user  so we need the id of that user

module.exports = router