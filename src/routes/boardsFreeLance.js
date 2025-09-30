const express = require("express");
const BoardFreeLanceController = require("../controller/boardFreeLance.js");
const router = express.Router();

router.get("/", BoardFreeLanceController.getAllBoards);
router.get("/:idUser", BoardFreeLanceController.getAllBoardsByUser);
router.get("/board/:idBoard", BoardFreeLanceController.getBoardsById);
router.get("/skills/:idBoard", BoardFreeLanceController.getSkillsOfBoard);

// // Create - Post
router.post('/create', BoardFreeLanceController.createNewBoard);

// Update - Patch
router.patch('/:idBoardFreeLance', BoardFreeLanceController.updateBoardFreeLance);

// Delete 
router.delete('/:idBoardFreeLance', BoardFreeLanceController.deleteBoardFreeLance);

module.exports = router;
