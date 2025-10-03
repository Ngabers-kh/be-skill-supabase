const supabase = require('../config/database');

const getAllBoardsLearning = async () => { 
  const { data: boards, error } = await supabase
    .from("boardLearning")
    .select(`
      id,
      title,
      description,
      price,
      date,
      startTime,
      endTime,
      status,
      users(name)`)
    .eq("status", "open");
    // .neq("idUserCreated", idUser);

  if (error) throw new Error(error.message);

  // untuk setiap board, ambil skills
  for (const board of boards) {
    const { data: boardSkills, error: boardSkillsError } = await supabase
      .from("boardLearningSkill")
      .select("idSkill")
      .eq("idBoardLearning", board.id);

    if (boardSkillsError) throw new Error(boardSkillsError.message);

    const skillIds = boardSkills.map((s) => s.idSkill);

    if (skillIds.length > 0) {
      const { data: skills, error: skillsError } = await supabase
        .from("skills")
        .select("idSkill, nameSkill")
        .in("idSkill", skillIds);

      if (skillsError) throw new Error(skillsError.message);

      board.skills = skills.map((s) => s.nameSkill); // tambahin ke board
    } else {
      board.skills = [];
    }
  }

  return boards;
};


// Create Board
const createNewBoard = async (body) => {
  const { data: boardData, error: boardError } = await supabase
    .from("boardLearning")
    .insert([
      {
        title: body.title,
        description: body.description,
        price: body.price,
        date: body.date,
        startTime: body.startTime,
        endTime: body.endTime,
        status: "open",
        idUser: body.idUser,
        link: body.link
      },
    ])
    .select();

  if (boardError) throw new Error(boardError.message);

  const newBoard = boardData[0];

  if (body.skills && body.skills.length > 0) {
    const skillRows = body.skills.map((idSkill) => ({
      idBoardLearning: newBoard.id,
      idSkill: idSkill,
    }));

    const { error: skillError } = await supabase
      .from("boardLearningSkill")
      .insert(skillRows);

    if (skillError) throw new Error(skillError.message);
  }

  return newBoard;
};

// Delete Board
const deleteBoardLearning = async (idBoardLearning) => {
  // hapus skill yang terkait dulu
  const { error: skillError } = await supabase
    .from("boardLearningSkill")
    .delete()
    .eq("idBoardLearning", idBoardLearning);

  if (skillError) throw new Error(skillError.message);

  // baru hapus board
  const { data, error } = await supabase
    .from("boardLearning")
    .delete()
    .eq("id", idBoardLearning);

  if (error) throw new Error(error.message);

  return data;
};

const getAllBoardsLearningByUser = async (idUser) => { 
  const { data: boards, error } = await supabase
    .from("boardLearning")
    .select(`
      id,
      title,
      description,
      price,
      date,
      startTime,
      endTime,
      status,
      users(name)
    `)
    .eq("idUser", idUser);

  if (error) throw new Error(error.message);

  for (const board of boards) {
    const { data: boardSkills, error: boardSkillsError } = await supabase
      .from("boardLearningSkill")
      .select("idSkill")
      .eq("idBoardLearning", board.id);

    if (boardSkillsError) throw new Error(boardSkillsError.message);

    const skillIds = boardSkills.map((s) => s.idSkill);

    if (skillIds.length > 0) {
      const { data: skills, error: skillsError } = await supabase
        .from("skills")
        .select("idSkill, nameSkill")
        .in("idSkill", skillIds);

      if (skillsError) throw new Error(skillsError.message);

      board.skills = skills.map((s) => s.nameSkill); 
    } else {
      board.skills = [];
    }
  }
  return boards;
};

const getBoardLearningById = async (idBoard) => {
  const { data: boards, error } = await supabase
    .from("boardLearning")
    .select(`
      id,
      title,
      description,
      price,
      date,
      startTime,
      endTime,
      status,
      users(name),
      link
    `)
    .eq("id", idBoard);

  if (error) {
    console.error("Error fetching board:", error);
    throw new Error(error.message);
  }

  if (boards.length === 0) {
    throw new Error(`No board found with id: ${idBoard}`);
  }

  return boards[0];
};

// Update Board
const updateBoardLearning = async (body, idBoardLearning) => {
    const { data, error } = await supabase
        .from('boardLearning')
        .update({
            title: body.title,
            description: body.description,
            price: body.price,
            date: body.date,
            startTime: body.startTime,
            endTime: body.endTime,
            status: body.status,
            idUser: body.idUser,
            link: body.link
        })
        .eq('id', idBoardLearning);
    if (error) throw new Error(error.message);
    
  // === Handle skills ===
  const { data: oldSkills } = await supabase
    .from("boardLearningSkill")
    .select("idSkill")
    .eq("idBoardLearning", idBoardLearning);

  const oldSkillIds = oldSkills.map(s => s.idSkill);
  const newSkillIds = body.skills;

  // Cari skill yang harus ditambah
  const toInsert = newSkillIds.filter(s => !oldSkillIds.includes(s));
  if (toInsert.length > 0) {
    await supabase
      .from("boardLearningSkill")
      .insert(toInsert.map(s => ({
        idBoardLearning,
        idSkill: s
      })));
  }

  // Cari skill yang harus dihapus
  const toDelete = oldSkillIds.filter(s => !newSkillIds.includes(s));
  if (toDelete.length > 0) {
    await supabase
      .from("boardLearningSkill")
      .delete()
      .eq("idBoardLearning", idBoardLearning)
      .in("idSkill", toDelete);
  }

  return data;
};

const getSkillsOfBoard = async (idBoard) => {
  const {data: boardLearningSkill, error: boardLearningSkillError} = await supabase
    .from("boardLearningSkill")
    .select("idSkill")
    .eq("idBoardLearning", idBoard);

  if (boardLearningSkillError) throw new Error(boardLearningSkillError.message);

  const skillIds = boardLearningSkill.map((s) => s.idSkill);
  if (skillIds.length === 0) return [];

  const {data: skills, error: skillsError} = await supabase
    .from("skills")
    .select("idSkill, nameSkill")
    .in("idSkill", skillIds);

  if (skillsError) throw new Error(skillsError.message);

  return skills;
}

module.exports = {
    getAllBoardsLearning,
    createNewBoard,
    updateBoardLearning,
    deleteBoardLearning,
    getAllBoardsLearningByUser,
    getBoardLearningById,
    getSkillsOfBoard,
}