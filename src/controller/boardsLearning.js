const BoardLearningModel = require("../models/boardsLearning");

class BoardLearningController {
  static async getAllBoards(req, res) {
    try {
      const boards = await BoardLearningModel.getAllBoardsLearning();
      res.json(boards);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async createNewBoard(req, res) {
      try {
        const { title, description, price, date, startTime, endTime, skills, status } = req.body;
        const user = await BoardLearningModel.createNewBoard({ title, description, price, date, startTime, endTime, skills, status });
        res.json(user);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }

  static async updateBoardLearning(req, res) {
      try {
        const { idBoardLearning } = req.params;
        await BoardLearningModel.updateBoardLearning(req.body, idBoardLearning);
        res.json({ message: "Board Updated" });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
  
  static async deleteBoardLearning(req, res) {
      try {
        const { idBoardLearning } = req.params;
        await BoardLearningModel.deleteBoardLearning(idBoardLearning);
        res.json({ message: "Board Deleted" });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
}

module.exports = BoardLearningController;