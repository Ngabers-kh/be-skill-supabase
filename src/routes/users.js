const express = require('express');

const UserController = require('../controller/users.js')
const router = express.Router();

// Create - Post
router.post('/register', UserController.createNewUser);

// Login (POST)
router.post('/login', UserController.loginUser);

// Read - Get
router.get('/', UserController.getAllUser);

// Update - Patch
router.patch('/:idUser', UserController.updateUser);

// Delete 
router.delete('/:idUser', UserController.deleteUser);

module.exports = router;
