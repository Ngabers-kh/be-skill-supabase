const ApplicationModel = require("../models/boardApplications");

class BoardApplicationsController {
    static async createBoardApplicationLearning(req, res) {
        try {
            const { idBoardLearning, idUser } = req.body;
            const application = await ApplicationModel.createBoardApplicationLearning({ idBoardLearning, idUser });
            res.json(application);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }  
    }
}

module.exports = BoardApplicationsController;