const supabase = require('../config/database');

// Get all users
const getAllUser = async () => {
    const { data, error } = await supabase.from('users').select('*');
    if (error) throw new Error(error.message);
    return data;
}

// Create new user
const createNewUser = async (body) => {
    const { data, error } = await supabase.from('users').insert([{
        name: body.name,
        email: body.email,
        address: body.address,
        role: 'user',
        job: body.job,
        password: body.password,
    }]);
    if (error) throw new Error(error.message, '500');
    return data;
}

// Update user
const updateUser = async (body, idUser) => {
    const { data, error } = await supabase
        .from('users')
        .update({
            name: body.name,
            email: body.email,
            address: body.address,
            role: 'user',
            job: body.job,
            password: body.password,
            bio: body.bio,
        })
        .eq('idUser', idUser);
    if (error) throw new Error(error.message);
    return data;
}

// Delete user
const deleteUser = async (idUser) => {
    const { data, error } = await supabase
        .from('users')
        .delete()
        .eq('idUser', idUser);
    if (error) throw new Error(error.message);
    return data;
}

// Get user by email
const getUserByEmail = async (email) => {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single(); // hanya ambil satu user
    if (error) throw new Error(error.message);
    return data;
}

module.exports = {
    createNewUser,
    getAllUser,
    updateUser,
    deleteUser,
    getUserByEmail, // tambahkan ini
}