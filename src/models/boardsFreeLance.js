const supabase = require('../config/database');
const { get } = require('../routes/users');

const getAllBoardsFreeLance = async () => {
  const { data: boards, error } = await supabase
    .from("boardFreeLance")
    .select(`
      id,
      title,
      description,
      price,
      quota,
      startDate,
      endDate,
      users(name)`)
      .eq("status", "open");

  if (error) throw new Error(error.message);

  // untuk setiap board, ambil skills
  for (const board of boards) {
    const { data: boardSkills, error: boardSkillsError } = await supabase
      .from("boardFreeLanceSkill")
      .select("idSkill")
      .eq("idBoardFreeLance", board.id);

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

const createNewBoard = async (body) => {
  const { data: boardData, error: boardError } = await supabase
        .from("boardFreeLance")
        .insert([
            {
                title: body.title,
                description: body.description,
                price: body.price,
                startDate: body.startDate,
                endDate: body.endDate,
                quota: body.quota,
                status: "open",
                idUser: body.idUser
            },
        ])
        .select(); 

    if (boardError) throw new Error(boardError.message);

  const newBoard = boardData[0];

  if (body.skills && body.skills.length > 0) {
    const skillRows = body.skills.map((idSkill) => ({
      idBoardFreeLance: newBoard.id,
      idSkill: idSkill,
    }));

    const { error: skillError } = await supabase
      .from("boardFreeLanceSkill")
      .insert(skillRows);

    if (skillError) throw new Error(skillError.message);
  }

  return newBoard;
};



// Delete Board
const deleteBoardFreeLance = async (idBoardFreeLance) => {

  // hapus skill yang terkait dulu
  const { error: skillError } = await supabase
    .from("boardFreeLanceSkill")
    .delete()
    .eq("idBoardFreeLance", idBoardFreeLance);

  if (skillError) throw new Error(skillError.message);

    const { data, error } = await supabase
        .from('boardFreeLance')
        .delete()
        .eq('id', idBoardFreeLance);
    if (error) throw new Error(error.message);
    return data;
}

const getAllBoardsFreeLanceByUserId = async ( idUser ) => {
  const { data: boards, error } = await supabase
    .from("boardFreeLance")
    .select(`
      id,
      title,
      description,
      price,
      quota,
      startDate,
      endDate,
      status,
      users(name)
    `)
    .eq("idUser", idUser);

  if (error) throw new Error(error.message);

  for (const board of boards) {
    const { data: boardSkills, error: boardSkillsError } = await supabase
      .from("boardFreeLanceSkill")
      .select("idSkill")
      .eq("idBoardFreeLance", board.id);

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

const getBoardsFreeLanceById = async (idBoard) => {
  const { data: boards, error } = await supabase
    .from("boardFreeLance")
    .select(`
      id,
      title,
      description,
      price,
      quota,
      startDate,
      endDate,
      status
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
const updateBoardFreeLance = async (body, idBoardFreeLance) => {
  const { data, error } = await supabase
    .from("boardFreeLance")
    .update({
      title: body.title,
      description: body.description,
      price: body.price,
      startDate: body.startDate,
      endDate: body.endDate,
      quota: body.quota,
      status: body.status,
      idUser: body.idUser
    })
    .eq("id", idBoardFreeLance);

  if (error) throw new Error(error.message);

  // === Handle skills ===
  const { data: oldSkills } = await supabase
    .from("boardFreeLanceSkill")
    .select("idSkill")
    .eq("idBoardFreeLance", idBoardFreeLance);

  const oldSkillIds = oldSkills.map(s => s.idSkill);
  const newSkillIds = body.skills;

  // Cari skill yang harus ditambah
  const toInsert = newSkillIds.filter(s => !oldSkillIds.includes(s));
  if (toInsert.length > 0) {
    await supabase
      .from("boardFreeLanceSkill")
      .insert(toInsert.map(s => ({
        idBoardFreeLance,
        idSkill: s
      })));
  }

  // Cari skill yang harus dihapus
  const toDelete = oldSkillIds.filter(s => !newSkillIds.includes(s));
  if (toDelete.length > 0) {
    await supabase
      .from("boardFreeLanceSkill")
      .delete()
      .eq("idBoardFreeLance", idBoardFreeLance)
      .in("idSkill", toDelete);
  }

  return data;
};


const getSkillsOfBoard = async (idBoard) => {
  const {data: boardFreeLanceSkill, error: boardFreeLanceSkillError} = await supabase
    .from("boardFreeLanceSkill")
    .select("idSkill")
    .eq("idBoardFreeLance", idBoard);

  if (boardFreeLanceSkillError) throw new Error(boardFreeLanceSkillError.message);

  const skillIds = boardFreeLanceSkill.map((s) => s.idSkill);
  if (skillIds.length === 0) return [];

  const {data: skills, error: skillsError} = await supabase
    .from("skills")
    .select("idSkill, nameSkill")
    .in("idSkill", skillIds);

  if (skillsError) throw new Error(skillsError.message);

  return skills;
}


module.exports = {
    getAllBoardsFreeLance,
    createNewBoard,
    updateBoardFreeLance,
    deleteBoardFreeLance,
    getAllBoardsFreeLanceByUserId,
    getBoardsFreeLanceById,
    getSkillsOfBoard,
}