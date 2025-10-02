const express = require('express');

const BoardApplicationsController = require('../controller/boardApplications.js')
const router = express.Router();

// create board application learning
router.post('/learning', BoardApplicationsController.createBoardApplicationLearning);
router.post('/learning/search', BoardApplicationsController.getIdUserBoardApplicationLearning);
router.get('/learning/:idUser', BoardApplicationsController.getAllAplicationLearningByUser);
// create board application FreeLance
router.post('/freelance', BoardApplicationsController.createBoardApplicationFreeLance);
router.post('/freelance/search', BoardApplicationsController.getIdUserBoardApplicationFreeLance);
router.get('/freelance/:idUser', BoardApplicationsController.getAllAplicationFreeLanceByUser);


module.exports = router;