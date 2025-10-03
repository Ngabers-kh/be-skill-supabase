const express = require('express');

const BoardApplicationsController = require('../controller/boardApplications.js')
const router = express.Router();

// create board application learning
router.post('/learning', BoardApplicationsController.createBoardApplicationLearning);
router.post('/learning/search', BoardApplicationsController.getIdUserBoardApplicationLearning);
router.get('/learning/:idUser', BoardApplicationsController.getAllAplicationLearningByUser);
router.get('/learning/messages/:idUser', BoardApplicationsController.getAllMessageLearningByUser);
router.get('/learning/message/:id', BoardApplicationsController.getMessageLearningById);

// create board application FreeLance
router.post('/freelance', BoardApplicationsController.createBoardApplicationFreeLance);
router.post('/freelance/search', BoardApplicationsController.getIdUserBoardApplicationFreeLance);
router.get('/freelance/:idUser', BoardApplicationsController.getAllAplicationFreeLanceByUser);
router.get('/freelance/messages/:idUser', BoardApplicationsController.getAllMessageFreeLanceByUser);
router.get('/freelance/message/:id', BoardApplicationsController.getMessageFreeLanceById);
router.post('/freeLance/message/update/:id', BoardApplicationsController.updateApplicationFreeLance);
router.get('/freelance/messages/reply/:idUser', BoardApplicationsController.getMessageFreeLanceFromApllyByUserId);
router.get('/freelance/messages/detail/:idReply', BoardApplicationsController.getReplyById);


module.exports = router;