const supabase = require('../config/database');

// Get all users
const getAllUser = async () => {
    const { data, error } = await supabase.from('users').select('*');
    if (error) throw new Error(error.message);
    return data;
}

const bcrypt = require("bcrypt");
const { get } = require('../routes/users');

const createNewUser = async (body) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const { data, error } = await supabase
        .from("users")
        .insert([
            {
                name: body.name,
                email: body.email,
                address: body.address,
                role: "user",
                job: body.job,
                password: hashedPassword,
            },
        ])
        .select(); 

    if (error) throw new Error(error.message);

    return data[0];
};

// Update User + Skills
const updateUser = async (body, idUser) => {
  const { data, error } = await supabase
    .from("users")
    .update({
      name: body.name,
      address: body.address,
      job: body.job,
      bio: body.bio,
      photo: body.photo,
    })
    .eq("idUser", idUser);

  if (error) throw new Error(error.message);

  const { data: oldSkills } = await supabase
    .from("userSkill")
    .select("idSkill")
    .eq("idUser", idUser);

  const oldSkillIds = oldSkills?.map((s) => s.idSkill) || [];
  const newSkillIds = body.skillIds || [];

  const toInsert = newSkillIds.filter((s) => !oldSkillIds.includes(s));
  if (toInsert.length > 0) {
    await supabase.from("userSkill").insert(
      toInsert.map((s) => ({
        idUser,
        idSkill: s,
      }))
    );
  }

  const toDelete = oldSkillIds.filter((s) => !newSkillIds.includes(s));
  if (toDelete.length > 0) {
    await supabase
      .from("userSkill")
      .delete()
      .eq("idUser", idUser)
      .in("idSkill", toDelete);
  }

  return data;
};

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
        .single(); 

    if (error) {
        console.error("Error fetching user:", error);
        throw new Error(error.message);
    }

    if (!data) {
        throw new Error("User not found");
    }

    return data; 
};

// Get user by id
const getUserById = async (id) => {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('idUser', id)
        .single(); 

    if (error) {
        console.error("Error fetching user:", error);
        throw new Error(error.message);
    }

    if (!data) {
        throw new Error("User not found");
    }

    return data; 
};

const addSkillsToUser = async (idUser, skillIds) => {
  const records = skillIds.map((skillId) => ({
    idUser,
    idSkill: skillId,
  }));

  const { data, error } = await supabase.from("userSkill").insert(records);

  if (error) throw new Error(error.message);
  return data;
};


// Get skills of a user
const getSkillsOfUser = async (idUser) => {
    const { data: userSkills, error: userSkillsError } = await supabase
        .from('userSkill')
        .select('idSkill')
        .eq('idUser', idUser);

    if (userSkillsError) throw new Error(userSkillsError.message);

    const skillIds = userSkills.map(skill => skill.idSkill);
    const { data: skills, error: skillsError } = await supabase
        .from('skills')
        .select('idSkill, nameSkill')
        .in('idSkill', skillIds);

    if (skillsError) throw new Error(skillsError.message);

    return skills;
}



module.exports = {
    createNewUser,
    getAllUser,
    updateUser,
    deleteUser,
    getUserByEmail,
    addSkillsToUser,
    getSkillsOfUser,
    getUserById,
}