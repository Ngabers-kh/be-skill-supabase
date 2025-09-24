const express = require("express");
const SkillController = require("../controller/skills.js");
const router = express.Router();

router.get("/", SkillController.getAllSkills);

module.exports = router;
