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
        const { title, description, price, date, startTime, endTime, skills, status, idUser } = req.body;
        const user = await BoardLearningModel.createNewBoard({ title, description, price, date, startTime, endTime, skills, status, idUser });
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
        const data = await BoardLearningModel.deleteBoardLearning(idBoardLearning);
        res.json({
            message: "BoardLearning deleted successfully",
            data,
        });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }

    static async getAllBoardsByUser(req, res) {
      try {
        const { idUser } = req.params;
        const boards = await BoardLearningModel.getAllBoardsLearningByUser(idUser);
        res.json(boards);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }

    static async getBoardsById(req, res) {
          try {
            const { idBoard } = req.params;
            const boards = await BoardLearningModel.getBoardLearningById(idBoard);
            res.json(boards);
          } catch (err) {
            res.status(500).json({ message: err.message });
          }
    }

    static async getSkillsOfBoard(req, res) {
          try {
            const { idBoard } = req.params;
            const skills = await BoardLearningModel.getSkillsOfBoard(idBoard);
            res.json(skills);
          } catch (err) {
            res.status(500).json({ message: err.message });
          }
    }
}

module.exports = BoardLearningController;