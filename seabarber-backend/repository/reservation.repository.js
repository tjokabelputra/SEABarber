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

async function getReservationById(req, res){
    const { rid } = req.params
    try{
        const reservation = await pool.query(
            `SELECT * FROM reservation WHERE order_id = $1`,[rid]
        )
        if(reservation.rows.length > 0){
            res.status(200).json(reservation.rows[0])
        }
        else{
            res.status(404).json({ message: "No Reservation Found" });
        }
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}

async function getReservationByAccount(req, res) {
    const { uid } = req.params;
    try {
        const userReservation = await pool.query(
            `SELECT u.id as user_id, u.full_name, r.order_id, r.phone, r.service, b.name AS branch_name , r.dateandtime 
            FROM users u INNER JOIN reservation r ON u.full_name = r.name 
            INNER JOIN branch b ON r.branch_id = b.id WHERE u.id = $1 ORDER BY dateandtime DESC`, [uid]
        );

        if (userReservation.rows.length > 0) {
            res.status(200).json(userReservation.rows);
        } else {
            res.status(404).json({ message: "No Reservation Found" });
        }
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getReservationByBranch(req, res) {
    const { bid } = req.params;
    try{
        const branchReservation = await pool.query(
            `SELECT b.id as branch_id, b.name AS branch, r.order_id, r.name, r.phone, r.service, r.dateandtime 
            FROM reservation r INNER JOIN branch b 
            ON r.branch_id = b.id WHERE branch_id = $1 ORDER BY dateandtime DESC`, [bid]
        )

        if(branchReservation.rows.length > 0) {
            res.status(200).json(branchReservation.rows)
        }
        else{
            res.status(404).json({ message: "No Reservation Found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateReservation(req, res){
    const { rid } = req.params;
    const { service, branch_id, dateandtime } = req.body;

    try{
        const editedReservation = await pool.query(
            `UPDATE reservation SET service = $1, branch_id = $2, dateandtime = $3 WHERE order_id = $4 RETURNING *`, [service, branch_id, dateandtime, rid]
        )
        if (editedReservation.rowCount > 0) {
            res.status(200).json(editedReservation.rows[0]);
        } 
        else {
            res.status(404).json({ message: "Reservation Not Found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteReservation(req, res) {
    const { rid } = req.params
    try{
        const deleteReservation = await pool.query(
            `DELETE FROM reservation WHERE order_id = $1`, [rid]
        )
        if(deleteReservation.rowCount == 0){
            return res.status(404).json({ message: "No Branch Found" });
        }
        res.status(200).json({ message: "Reservation Deleted Successfully", deletedReservation: deleteReservation.rows[0] });
    }
    catch(error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createReservation,
    getAllReservation,
    getReservationById,
    getReservationByAccount,
    getReservationByBranch,
    updateReservation,
    deleteReservation
};