const express = require("express");
const BoardController = require("../controller/boardsLearning.js");
const router = express.Router();

router.get("/", BoardController.getAllBoards);

// // Create - Post
router.post('/create', BoardController.createNewBoard);

// Update - Patch
router.patch('/:idBoardLearning', BoardController.updateBoardLearning);

// Delete 
router.delete('/:idBoardLearning', BoardController.deleteBoardLearning);

module.exports = router;
