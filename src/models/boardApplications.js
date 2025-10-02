const supabase = require('../config/database');

// create board application for learning
const createBoardApplicationLearning = async (body) => {
  const { data, error } = await supabase
    .from("boardLearningApplications")
    .insert([
        {
            idBoardLearning: body.idBoardLearning,
            idTransaction: body.idTransaction,
            idUser: body.idUser,
            totalAmount: body.totalAmount,
            paymentStatus: "Success",
        }
    ])
    .select();

    if (error) throw new Error(error.message);
    return data[0];
};

// get idUser dan id BoardLearning
const getIdUserIdBoardLearning = async (body) => {
  const { idUser, idBoardLearning } = body;

  const { data, error } = await supabase
    .from("boardLearningApplications")
    .select("id")
    .eq("idUser", idUser)
    .eq("idBoardLearning", idBoardLearning)
    .limit(1);

  if (error) {
    console.error("Supabase error:", error.message);
    throw error;
  }

  return data && data.length > 0; // true kalau ada, false kalau tidak
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
    getIdUserIdBoardLearning
};