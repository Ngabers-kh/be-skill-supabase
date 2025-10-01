const supabase = require('../config/database');

// create board application for learning
const createBoardApplicationLearning = async (body) => {
  const { data, error } = await supabase
    .from("boardlearningApplications")
    .insert([
        {
            idBoardLearning: body.idBoardLearning,
            idUser: body.idUser,
            status: "pending",
            category: "learning",
        }
    ])
    .select();

    if (error) throw new Error(error.message);
    return data[0];
};

// create board applications for freelance
const createBoardApplicationFreelance = async (body) => {
  const { data, error } = await supabase
    .from("boardFreeLanceApplications")
    .insert([
        {
            idBoardFreeLance: body.idBoardFreeLance,
            idUser: body.idUser,
            status: "pending",
            category: "freeLance",
        }
    ])
    .select();

    if (error) throw new Error(error.message);
    return data[0];
};


module.exports = {
    createBoardApplicationLearning,
};