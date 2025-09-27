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
      users(name)
    `);

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
            skills: body.skills,
            status: body.status,
            "idUser": body.idUser,
        })
        .eq('id', idBoardLearning);
    if (error) throw new Error(error.message);
    return data;
}

// Delete Board
const deleteBoardLearning = async (idBoardLearning) => {
    const { data, error } = await supabase
        .from('boardLearning')
        .delete()
        .eq('id', idBoardLearning);
    if (error) throw new Error(error.message);
    return data;
}

module.exports = {
    getAllBoardsLearning,
    createNewBoard,
    updateBoardLearning,
    deleteBoardLearning
}