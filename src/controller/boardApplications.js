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
                alreadyExist,
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
                alreadyExist,
            });
        } catch (err) {
            console.error("Error getIdUserBoardApplicationFreeLance:", err);
            return res.status(500).json({ message: err.message });
        }
    }

  // GET all freelance applications by userId
    static async getAllAplicationFreeLanceByUser(req, res) {
    try {
      const { idUser } = req.params; // pastikan route pakai :idUser

      const applications = await ApplicationModel.getAllAplicationFreeLanceByUserId(idUser);
      res.status(200).json(applications);
    } catch (err) {
      console.error("Error getAllAplicationFreeLanceByUser:", err);
      res.status(500).json({ message: err.message });
    }
  }

  static async getAllAplicationLearningByUser(req, res) {
    try {
      const { idUser } = req.params; 

      const applications = await ApplicationModel.getAllAplicationLearningByUserId(idUser);
      res.status(200).json(applications);
    } catch (err) {
      console.error("Error getAllAplicationLearningByUser:", err);
      res.status(500).json({ message: err.message });
    }
  }

  static async getAllMessageFreeLanceByUser(req, res) {
    try {
      const { idUser } = req.params; 
      const message = await ApplicationModel.getMessageFreeLanceApplications(idUser);
      res.status(200).json(message);
    } catch (err) {
      console.error("Error getAllAplicationLearningByUser:", err);
      res.status(500).json({ message: err.message });
    }
  }

  static async getAllMessageLearningByUser(req, res) {
    try {
      const { idUser } = req.params; 
      const message = await ApplicationModel.getMessageLearningApplications(idUser);
      res.status(200).json(message);
    } catch (err) {
      console.error("Error getAllAplicationLearningByUser:", err);
      res.status(500).json({ message: err.message });
    }
  }

  static async getMessageLearningById(req, res) {
    try {
      const { id } = req.params;
      const message = await ApplicationModel.getMessageLearningApplicationsbyId(id);
      res.status(200).json(message);
    } catch (err) {
      console.error("Error getAllAplicationLearningByUser:", err);
      res.status(500).json({ message: err.message });
    }
  }

  static async getMessageFreeLanceById(req, res) {
    try {
      const { id } = req.params; 
      const message = await ApplicationModel.getMessageFreeLanceApplicationsById(id);
      res.status(200).json(message);
    } catch (err) {
      console.error("Error getAllAplicationFreeLanceByUser:", err);
      res.status(500).json({ message: err.message });
    }
  }

  static async updateApplicationFreeLance(req, res) {
      try {
        const { id } = req.params;
        await ApplicationModel.updateApplicationFreeLance(req.body, id);
        res.json({ message: "Board updated" });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }

  static async getMessageFreeLanceFromApllyByUserId(req, res) {
    try {
      const { idUser } = req.params;
      const message = await ApplicationModel.getAllMessagesFromApply(idUser);
      res.status(200).json(message);
    } catch (err) {
      console.error("Error getAllAplicationFreeLanceByUser:", err);
      res.status(500).json({ message: err.message });
    }
  }

  static async getReplyById(req, res) {
            try {
              const { idReply} = req.params;
              const reply = await ApplicationModel.getMessageFreeLanceFromById(idReply);
              res.json(reply);
            } catch (err) {
              res.status(500).json({ message: err.message });
            }
      }

}

module.exports = BoardApplicationsController;