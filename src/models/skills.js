const supabase = require('../config/database');

const getAllSkills = async () => {
    const { data, error } = await supabase.from('skills').select('*');
    if (error) throw new Error(error.message);
    return data;
}

module.exports = {
    getAllSkills,
}