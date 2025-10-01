const express = require('express');

const BoardApplicationsController = require('../controller/boardApplications.js')
const router = express.Router();

// create board application learning
router.post('/learning', BoardApplicationsController.createBoardApplicationLearning);

module.exports = router;