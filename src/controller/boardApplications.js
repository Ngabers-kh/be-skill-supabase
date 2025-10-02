const ApplicationModel = require("../models/boardApplications");

class BoardApplicationsController {
    static async createBoardApplicationLearning(req, res) {
        try {
            const { idBoardLearning, idUser, idTransaction, totalAmount } = req.body;
            const application = await ApplicationModel.createBoardApplicationLearning({ idBoardLearning, idUser, idTransaction, totalAmount });
            res.json(application);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }  
    }

    static async getIdUserBoardApplicationLearning(req, res) {
        try {
            const { idBoardLearning, idUser } = req.body;
            const alreadyExist = await ApplicationModel.getIdUserIdBoardLearning({ idBoardLearning, idUser });

            return res.json({
                alreadyExist, // true kalau sudah ada, false kalau belum
            });
        } catch (err) {
            console.error("Error getIdUserBoardApplicationLearning:", err);
            return res.status(500).json({ message: err.message });
        }
    }

    static async createBoardApplicationFreeLance(req, res) {
        try {
            const { idBoardFreeLance, idUser, idUserCreated, message, subject } = req.body;
            const application = await ApplicationModel.createBoardApplicationFreelance({ idBoardFreeLance, idUser, idUserCreated, message, subject });
            res.json(application);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }  
    }

    static async getIdUserBoardApplicationFreeLance(req, res) {
        try {
            const { idBoardFreeLance, idUser } = req.body;
            const alreadyExist = await ApplicationModel.getIdUserIdBoardFreeLance({ idBoardFreeLance, idUser });

            return res.json({
                alreadyExist, // true kalau sudah ada, false kalau belum
            });
        } catch (err) {
            console.error("Error getIdUserBoardApplicationFreeLance:", err);
            return res.status(500).json({ message: err.message });
        }
    }
}

module.exports = BoardApplicationsController;