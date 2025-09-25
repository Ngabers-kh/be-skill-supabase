const BoardFreeLanceModel = require("../models/boardsFreeLance");

class BoardFreeLanceController {
  static async getAllBoards(req, res) {
    try {
      const boards = await BoardFreeLanceModel.getAllBoardsFreeLance();
      res.json(boards);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async createNewBoard(req, res) {
      try {
        const { title, description, price, startDate, endDate, quota, skills, status, idUser } = req.body;
        const user = await BoardFreeLanceModel.createNewBoard({ title, description, price, startDate, endDate, quota, skills, status, idUser });
        res.json(user);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }

  static async updateBoardFreeLance(req, res) {
      try {
        const { idBoardFreeLance } = req.params;
        await BoardFreeLanceModel.updateBoardFreeLance(req.body, idBoardFreeLance);
        res.json({ message: "Board Updated" });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
  
  static async deleteBoardFreeLance(req, res) {
      try {
        const { idBoardFreeLance } = req.params;
        const data = await BoardFreeLanceModel.deleteBoardFreeLance(idBoardFreeLance);
        if (!data || data.length === 0) {
        throw new Error("BoardFreeLance not found");
        }
        res.json({
            message: "BoardFreeLance deleted successfully",
            data,
        });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
}

module.exports = BoardFreeLanceController;