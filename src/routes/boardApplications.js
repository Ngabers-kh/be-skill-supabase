const express = require('express');

const BoardApplicationsController = require('../controller/boardApplications.js')
const router = express.Router();

// create board application learning
router.post('/learning', BoardApplicationsController.createBoardApplicationLearning);
router.post('/learning/search', BoardApplicationsController.getIdUserBoardApplicationLearning);

module.exports = router;