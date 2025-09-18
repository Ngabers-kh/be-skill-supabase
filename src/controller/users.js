const UserModel = require('../models/users');

const getAllUser = async (req, res) => {
    try {
        const data = await UserModel.getAllUser();
        res.json({
            message: 'get all users sukses',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: 'server error',
            serverMassage: error,
        })
    }
}

const createNewUser = async (req, res) => {
    const {body} = req;
    try {
        await UserModel.createNewUser(body);
        res.json({
            message: 'buat user berhasil',
            data: req.body,
        })
    } catch (error) {
        res.status(500).json({
            message: 'server error',
            serverMassage: error,
        })
    }
}

const updateUser = async (req, res) => {
    const {idUser} = req.params;
    const {body} = req;
    try {
        await UserModel.updateUser(body, idUser);
        res.json({
            message: 'update user sukses',
            data: {
                id: idUser,
                ...body
            },
        })
    } catch (error) {
        res.status(500).json({
            message: 'server error',
            serverMassage: error,
        })
    }
}

const deleteUser = async (req, res) => {
    const {idUser} = req.params;
    try {
        await UserModel.deleteUser(idUser);
        console.log('id user:', idUser);
        res.json({
            message: 'Delete user sukses',
            data: null,
        })
    } catch (error) {
        res.status(500).json({
            message: 'server error',
            serverMassage: error,
        })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    // Contoh: cari user di database (ganti sesuai database kamu)
    const user = await UserModel.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    // Cek password (harusnya hash, ini contoh saja)
    if (user.password !== password) {
      return res.status(401).json({ message: "Wrong password" });
    }
    // Jika sukses
    res.json({ message: "Login berhasil", user });
  };

module.exports = {
    getAllUser,
    createNewUser,
    updateUser,
    deleteUser,
    loginUser
};