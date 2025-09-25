const supabase = require('../config/database');

const getAllBoardsLearning= async () => {
    const { data, error } = await supabase.from('boardLearning').select('*');
    if (error) throw new Error(error.message);
    return data;
}

const createNewBoard = async (body) => {

    const { data, error } = await supabase
        .from("boardLearning")
        .insert([
            {
                title: body.title,
                description: body.description,
                price: body.price,
                date: body.date,
                startTime: body.startTime,
                endTime: body.endTime,
                skills: body.skills,
                status: "Show",
            },
        ])
        .select(); 

    if (error) throw new Error(error.message);

    return data[0]; 
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
        })
        .eq('id', idBoardLearning);
    if (error) throw new Error(error.message);
    return data;
}

// Delete user
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