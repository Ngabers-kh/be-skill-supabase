const SkillModel = require("../models/skills");

class SkillController {
  static async getAllSkills(req, res) {
    try {
      const skills = await SkillModel.getAllSkills();
      res.json(skills);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = SkillController;
