const pool = require("../db/instance");

async function createReservation(req, res){
    const {name, phone, service, branch_id, dateandtime} = req.body;

    try{
        const checkBranch = await pool.query(
            `SELECT * FROM branch WHERE id = $1`,
            [branch_id]
        )

        if(checkBranch.rows.length === 0 ){
            return res.status(404).json({ message: "No Branch Found" });
        }

        const reservation = await pool.query(
        `INSERT INTO reservation (name, phone, service, branch_id,  dateandtime) VALUES ($1, $2, $3, $4, $5) RETURNING *`, 
            [name, phone, service, branch_id, dateandtime]
        );

        res.status(200).json(reservation.rows);
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}

async function getAllReservation(req, res){
    try{
        const allReservation = await pool.query(
            `SELECT r.name, r.phone, r.service, b.name AS branch, r.dateandtime 
             FROM reservation r 
             INNER JOIN branch b ON r.branch_id = b.id`
        )
        if(allReservation.rows.length > 0){
            res.status(200).json(allReservation.rows);
        }
        else{
            res.status(404).json({ message: "No Reservation Found" });
        }
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createReservation,
    getAllReservation
};