const supabase = require('../config/database');

const getAllBoardsFreeLance= async () => {
    const { data, error } = await supabase.from('boardFreeLance').select('*');
    if (error) throw new Error(error.message);
    return data;
}

const createNewBoard = async (body) => {
    const { data, error } = await supabase
        .from("boardFreeLance")
        .insert([
            {
                title: body.title,
                description: body.description,
                price: body.price,
                startDate: body.startDate,
                endDate: body.endDate,
                quota: body.quota,
                skills: body.skills,
                status: "Show",
                "idUser": body.idUser
            },
        ])
        .select(); 

    if (error) throw new Error(error.message);

    return data[0]; 
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