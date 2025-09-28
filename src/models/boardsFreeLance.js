const supabase = require('../config/database');

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
      status,
      users(name)
    `);

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

// Update Board
const updateBoardFreeLance= async (body, idBoardFreeLance) => {
    const { data, error } = await supabase
        .from('boardFreeLance')
        .update({
            title: body.title,
            description: body.description,
            price: body.price,
            startDate: body.startDate,
            endDate: body.endDate,
            quota: body.quota,
            skills: body.skills,
            status: body.status,
            "idUser": body.idUser
        })
        .eq('id', idBoardFreeLance);
    if (error) throw new Error(error.message);
    return data;
}

// Delete user
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

      board.skills = skills.map((s) => s.nameSkill);
    } else {
      board.skills = [];
    }
  }
  return boards;
};

const getBoardsFreeLanceById = async ( idBoard ) => {
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
    .eq("id", idBoard);

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

      board.skills = skills.map((s) => s.nameSkill);
    } else {
      board.skills = [];
    }
  }
  return boards;
};


module.exports = {
    getAllBoardsFreeLance,
    createNewBoard,
    updateBoardFreeLance,
    deleteBoardFreeLance,
    getAllBoardsFreeLanceByUserId,
    getBoardsFreeLanceById
}