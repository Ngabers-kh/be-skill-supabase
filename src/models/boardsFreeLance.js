const supabase = require('../config/database');

const getAllBoardsFreeLance= async () => {
    const { data, error } = await supabase.from('boardFreeLance').select('*');
    if (error) throw new Error(error.message);
    return data;
}

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
    const { data, error } = await supabase
        .from('boardFreeLance')
        .delete()
        .eq('id', idBoardFreeLance);
    if (error) throw new Error(error.message);
    return data;
}

module.exports = {
    getAllBoardsFreeLance,
    createNewBoard,
    updateBoardFreeLance,
    deleteBoardFreeLance
}