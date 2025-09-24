const UserModel = require("../models/users");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const bcrypt = require("bcrypt");

class UserController {
  // Create
  static async createNewUser(req, res) {
    try {
      const { name, email, password, address, job } = req.body;
      const user = await UserModel.createNewUser({ name, email, password, address, job });
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Login
  static async loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await UserModel.getUserByEmail(email);

        // Memeriksa apakah pengguna ditemukan dan memverifikasi password
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Membuat token JWT
        const token = jwt.sign(
            { id: user.idUser, email: user.email },
            JWT_SECRET,
            { expiresIn: "10m" } // Token berlaku selama 10 menit
        );

        // Mengembalikan respons yang berisi token dan informasi pengguna
        res.json({
            message: "Login success",
            userId: user.idUser, // Pastikan ini sesuai dengan model pengguna
            token: token,
        });
        } catch (err) {
            console.error("Login error:", err); // Tambahkan logging untuk kesalahan
            res.status(500).json({ message: "Internal server error" });
        }
    }

  // Get all users
  static async getAllUser(req, res) {
    try {
      const users = await UserModel.getAllUser();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Update
  static async updateUser(req, res) {
    try {
      const { idUser } = req.params;
      await UserModel.updateUser(req.body, idUser);
      res.json({ message: "User updated" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Delete
  static async deleteUser(req, res) {
    try {
      const { idUser } = req.params;
      await UserModel.deleteUser(idUser);
      res.json({ message: "User deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Tambah / update skills user
  static async addSkillsUser(req, res) {
    console.log("Request received:", req.params, req.body); // Tambahkan ini
    try {
        const { idUser } = req.params;
        const { skills } = req.body; // array of skill_id

        const result = await UserModel.addSkillsToUser(idUser, skills);
        res.json({ message: "Skills updated"});
    } catch (err) {
        console.error(err); // Tambahkan ini untuk melihat kesalahan
        res.status(500).json({ message: err.message });
    }
}

  // Ambil semua skill user
  static async getSkillsOfUser(req, res) {
    try {
      const { idUser } = req.params;
      const result = await UserModel.getSkillsOfUser(idUser);
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = UserController;
