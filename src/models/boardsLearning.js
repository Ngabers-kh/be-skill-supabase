const supabase = require('../config/database');

const getAllBoardsLearning= async () => {
    const { data, error } = await supabase.from('boardLearning').select('id, title, description, price, date, startTime, endTime, skills, status, name: users(name), idUser');
    if (error) throw new Error(error.message);
    return data;
}

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