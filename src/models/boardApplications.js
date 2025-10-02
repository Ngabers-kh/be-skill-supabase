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
            idUserCreated: body.idUserCreated,
            message: body.message,
            subject: body.subject,
            status: "pending",
        }
    ])
    .select();

    if (error) throw new Error(error.message);
    return data[0];
};

// get idUser dan id BoardFreeLance
const getIdUserIdBoardFreeLance = async (body) => {
  const { idUser, idBoardFreeLance } = body;

  const { data, error } = await supabase
    .from("boardFreeLanceApplications")
    .select("id")
    .eq("idUser", idUser)
    .eq("idBoardFreeLance", idBoardFreeLance)
    .limit(1);

  if (error) {
    console.error("Supabase error:", error.message);
    throw error;
  }

  return data && data.length > 0; // true kalau ada, false kalau tidak
};

// get all board apllication
const getAllAplicationFreeLanceByUserId = async (idUser) => {
  const { data: applications, error } = await supabase
    .from("boardFreeLanceApplications")
    .select(`
      id,
      status,
      subject,
      message,
      created_at,
      boardFreeLance (
        id,
        title,
        description,
        price,
        quota,
        startDate,
        endDate,
        status,
        users(name)
      )
    `)
    .eq("idUser", idUser);

  if (error) throw new Error(error.message);

  // null check + tambah skills
  for (const app of applications) {
    if (!app.boardFreeLance) {
      app.boardFreeLance = { skills: [] };
      continue;
    }

    const { data: boardSkills, error: boardSkillsError } = await supabase
      .from("boardFreeLanceSkill")
      .select("idSkill")
      .eq("idBoardFreeLance", app.boardFreeLance.id);

    if (boardSkillsError) throw new Error(boardSkillsError.message);

    const skillIds = boardSkills.map((s) => s.idSkill);

    if (skillIds.length > 0) {
      const { data: skills, error: skillsError } = await supabase
        .from("skills")
        .select("idSkill, nameSkill")
        .in("idSkill", skillIds);

      if (skillsError) throw new Error(skillsError.message);

      app.boardFreeLance.skills = skills.map((s) => s.nameSkill);
    } else {
      app.boardFreeLance.skills = [];
    }
  }

  return applications;
};

// get all board apllication
const getAllAplicationLearningByUserId = async (idUser) => {
  const { data: applications, error } = await supabase
    .from("boardLearningApplications")
    .select(`
      id,
      idTransaction,
      totalAmount,
      paymentStatus,
      created_at,
      boardLearning (
        id,
        title,
        description,
        price,
        date,
        startTime,
        endTime,
        status,
        users(name)
      )
    `)
    .eq("idUser", idUser);

  if (error) throw new Error(error.message);

  // null check + tambah skills
  for (const app of applications) {
    if (!app.boardLearning) {
      app.boardLearning = { skills: [] };
      continue;
    }

    const { data: boardSkills, error: boardSkillsError } = await supabase
      .from("boardLearningSkill")
      .select("idSkill")
      .eq("idBoardLearning", app.boardLearning.id);

    if (boardSkillsError) throw new Error(boardSkillsError.message);

    const skillIds = boardSkills.map((s) => s.idSkill);

    if (skillIds.length > 0) {
      const { data: skills, error: skillsError } = await supabase
        .from("skills")
        .select("idSkill, nameSkill")
        .in("idSkill", skillIds);

      if (skillsError) throw new Error(skillsError.message);

      app.boardLearning.skills = skills.map((s) => s.nameSkill);
    } else {
      app.boardLearning.skills = [];
    }
  }

  return applications;
};






module.exports = {
    createBoardApplicationLearning,
    getIdUserIdBoardLearning,
    createBoardApplicationFreelance,
    getIdUserIdBoardFreeLance,
    getAllAplicationFreeLanceByUserId,
    getAllAplicationLearningByUserId
};