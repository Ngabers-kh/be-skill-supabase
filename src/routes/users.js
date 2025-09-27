const express = require('express');

const UserController = require('../controller/users.js')
const router = express.Router();

// Create - Post
router.post('/register', UserController.createNewUser);

// Login (POST)
router.post('/login', UserController.loginUser);

// Read - Get
router.get('/', UserController.getAllUser);

// Read - Get
router.get('/:idUser', UserController.getUser);

// Update - Patch
router.patch('/:idUser', UserController.updateUser);

// Delete 
router.delete('/:idUser', UserController.deleteUser);

// skill relasi
router.post("/:idUser/skills", UserController.addSkillsUser);
router.get("/:idUser/skills", UserController.getSkillsOfUser);

module.exports = router;
