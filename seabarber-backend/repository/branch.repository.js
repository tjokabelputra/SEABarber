const pool = require("../db/instance");

async function createBranch(req, res){
    const { name, location, open_time, closing_time } = req.body;
    
    try{
        const newBranch = await pool.query(
            `INSERT INTO branches (name, location, open_time, closing_time) VALUES ($1, $2, $3, $4) RETURNING *`,
            [name, location, open_time, closing_time]
        )
        res.status(200).json(newBranch.rows[0]);
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}

async function getAllBranch(req, res){
    try{
        const allBranch = await pool.query(
            `SELECT * FROM branches ORDER BY id ASC`
        )
        if(allBranch.rows.length > 0){
            res.status(200).json(allBranch.rows);
        }
        else{
            res.status(404).json({ message: "No Branch Found" });
        }
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}

async function editBranch(req, res) {
    const { bid } = req.params;
    const { name, location, open_time, closing_time } = req.body;

    try{
        const editedBranch = await pool.query(
            `UPDATE branches SET name = $1, location = $2, open_time = $3, closing_time = $4 WHERE id = $5 RETURNING *`,
            [name, location, open_time, closing_time, bid]
        )
        if (editedBranch.rowCount > 0) {
            res.status(200).json(editedBranch.rows[0]);
        } 
        else {
            res.status(404).json({ message: "Branch Not Found" });
        }
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteBranch(req, res) {
    const { bid } = req.params;

    try {
        const deletedBranch = await pool.query(
            `DELETE FROM branches WHERE id = $1`,
            [bid]
        );
        if (deletedBranch.rowCount == 0) {
            return res.status(404).json({ message: "No Branch Found" });
        } 
        res.status(200).json({ message: "Branch Deleted Successfully", deletedBranch: deletedBranch.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createBranch,
    getAllBranch,
    editBranch,
    deleteBranch
}