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
      },
    ])
    .select();

  if (error) throw new Error(error.message);

  // Ambil amount lama
  const { data: boardData, error: fetchError } = await supabase
    .from("boardLearning")
    .select("amount")
    .eq("id", body.idBoardLearning)
    .single();

  if (fetchError) throw new Error(fetchError.message);

  // Tambah 1
  const newAmount = (boardData?.amount || 0) + 1;

  // Update amount
  const { error: updateError } = await supabase
    .from("boardLearning")
    .update({ amount: newAmount })
    .eq("id", body.idBoardLearning);

  if (updateError) throw new Error(updateError.message);

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

const getMessageFreeLanceApplications = async (idUser) => {
  const { data, error } = await supabase
    .from("boardFreeLanceApplications")
    .select(`
      id,
      message,
      subject,
      created_at,
      boardFreeLance (
        id,
        title
      )
    `)
    .eq("idUserCreated", idUser);

  if (error) throw new Error(error.message);

  return data.map((app) => ({
    id: app.id,
    message: app.message,
    subject: app.subject,
    created_at: app.created_at,
    boardTitle: app.boardFreeLance?.title || null,
  }));
};

const getMessageFreeLanceApplicationsById = async (id) => {
  const { data, error } = await supabase
    .from("boardFreeLanceApplications")
    .select(`
      id,
      message,
      subject,
      created_at,
      status,
      boardFreeLance (
        id,
        title
      ),
      idUser (
        idUser,
        name,
        email
      )
    `)
    .eq("id", id);

  if (error) throw new Error(error.message);

  return data.map((app) => ({
    id: app.id,
    message: app.message,
    subject: app.subject,
    created_at: app.created_at,
    idUserCreated: app.idUserCreated,
    status: app.status,
    idBoardFreeLance: app.boardFreeLance?.id || null,
    boardTitle: app.boardFreeLance?.title || null,
    idUserTarget: app.idUser?.idUser|| null,
    user: app.idUser?.name || null,
    email: app.idUser?.email || null,
  }));
};

const updateApplicationFreeLance = async (body, id) => {
  // Update status aplikasi
  const { data: updated, error: updateError } = await supabase
    .from("boardFreeLanceApplications")
    .update({ status: body.status })
    .eq("id", id)
    .select();

  if (updateError) throw new Error(updateError.message);

  // Insert ke tabel pesan (log/message)
  const { data: newBoard, error: insertError } = await supabase
    .from("freeLanceMessages")
    .insert([
      {
        subject: body.subject,
        status: body.status,
        idUserTarget: body.idUserTarget,
        idBoardFreeLance: body.idBoardFreeLance,
        idUserCreated: body.idUserCreated,
      },
    ])
    .select();

  if (insertError) throw new Error(insertError.message);

  return { updated, newBoard };
};

const getMessageLearningApplications = async (idUser) => {
  const { data, error } = await supabase
    .from("boardLearningApplications")
    .select(`
      id,
      created_at,
      boardLearning (
        id,
        title,
        description,
        users ( name )
      )
    `)
    .eq("idUser", idUser); // filter berdasarkan user yang apply

  if (error) throw new Error(error.message);

  return data.map((app) => ({
    id: app.id,
    created_at: app.created_at,
    boardTitle: app.boardLearning?.title || null,
    boardDescription: app.boardLearning?.description || null,
    organizer: app.boardLearning?.users?.name || null,
  }));
};

const getMessageLearningApplicationsbyId = async (id) => {
  const { data, error } = await supabase
    .from("boardLearningApplications")
    .select(`
      id,
      totalAmount,
      paymentStatus,
      created_at,
      boardLearning (
        id,
        title,
        description,
        link,
        date,
        startTime,
        endTime,
        users ( name )
      )
    `)
    .eq("id", id); // filter berdasarkan user yang apply

  if (error) throw new Error(error.message);

  return data.map((app) => ({
    id: app.id,
    totalAmount: app.totalAmount,
    paymentStatus: app.paymentStatus,
    created_at: app.created_at,
    boardTitle: app.boardLearning?.title || null,
    boardDescription: app.boardLearning?.description || null,
    link: app.boardLearning?.link || null,
    date: app.boardLearning?.date || null,
    startTime: app.boardLearning?.startTime || null,
    endTime: app.boardLearning?.endTime || null,
    organizer: app.boardLearning?.users?.name || null,
  }));
};

const getAllMessagesFromApply = async (idUser) => {
    const { data, error } = await supabase.from('freeLanceMessages').select('*').eq('idUserTarget', idUser);
    if (error) throw new Error(error.message);
    return data;
}

const getMessageFreeLanceFromById = async (id) => {
  const { data, error } = await supabase
    .from("freeLanceMessages")
    .select(
      `
      id,
      subject,
      status,
      created_at,
      idBoardFreeLance(title, description),
      idUserTarget(name, email),
      idUserCreated(name, email)
    `
    )
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
};



module.exports = {
    createBoardApplicationLearning,
    getIdUserIdBoardLearning,
    createBoardApplicationFreelance,
    getIdUserIdBoardFreeLance,
    getAllAplicationFreeLanceByUserId,
    getAllAplicationLearningByUserId,
    getMessageFreeLanceApplications,
    getMessageLearningApplications,
    getMessageLearningApplicationsbyId,
    getMessageFreeLanceApplicationsById,
    updateApplicationFreeLance,
    getAllMessagesFromApply,
    getMessageFreeLanceFromById
};