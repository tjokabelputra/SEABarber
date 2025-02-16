const pool = require("../db/instance");
const { validationResult } = require('express-validator')

async function createReservation(req, res){
    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        console.log(errors)
        return res.status(422).json({ error: "Invalid Input, please check your data" })
    }
    
    const {branch_id, service, reservation_time} = req.body;
    const user_id = req.userData.id
    const name = req.userData.username
    const phone = req.userData.phone

    try{
        const checkBranch = await pool.query(
            `SELECT * FROM branches WHERE id = $1`,
            [branch_id]
        )

        if(checkBranch.rows.length === 0 ){
            return res.status(404).json({ error: "No Branch Found" });
        }

        const reservation = await pool.query(
        `INSERT INTO reservations (user_id, branch_id, name, phone, service, reservation_time) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, 
            [user_id, branch_id, name, phone, service, reservation_time]
        );

        res.status(201).json(reservation.rows[0]);
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}

async function getAllReservation(req, res){
    try{
        const allReservation = await pool.query(
            `SELECT r.id, r.name, r.phone, r.service, b.name AS branch_name, r.reservation_time
             FROM reservations r 
             INNER JOIN branches b ON r.branch_id = b.id ORDER BY reservation_time ASC`
        )
        if(allReservation.rows.length > 0){
            res.status(200).json(allReservation.rows);
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
            `SELECT * FROM reservations WHERE id = $1`,[rid]
        )
        if(reservation.rows.length > 0){
            res.status(200).json(reservation.rows[0])
        }
        else{
            res.status(404).json({ error: "No Reservation Found" });
        }
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}

async function getReservationByAccount(req, res) {
    const uid = req.userData.id
    
    try {
        const userReservation = await pool.query(
            `SELECT r.id, r.user_id, b.name as branch_name, r.name, r.phone, r.service, r.reservation_time 
            FROM reservations r INNER JOIN branches b
            ON r.branch_id = b.id WHERE r.user_id = $1 ORDER BY reservation_time ASC`, [uid]
        );

        if (userReservation.rows.length > 0) {
            res.status(200).json(userReservation.rows);
        } else {
            res.status(404).json({ error: "No Reservation Found" });
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
            `SELECT r.id, r.user_id, b.name as branch_name, r.name, r.phone, r.service, r.reservation_time 
            FROM reservations r INNER JOIN branches b
            ON r.branch_id = b.id WHERE b.id = $1 ORDER BY reservation_time ASC`, [bid]
        )

        if(branchReservation.rows.length > 0) {
            res.status(200).json(branchReservation.rows)
        }
        else{
            res.status(404).json({ error: "No Reservation Found" });
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
            `UPDATE reservations SET service = $1, branch_id = $2, reservation_time = $3 WHERE id = $4 RETURNING *`, [service, branch_id, dateandtime, rid]
        )
        if (editedReservation.rowCount > 0) {
            res.status(200).json(editedReservation.rows[0]);
        } 
        else {
            res.status(404).json({ error: "Reservation Not Found" });
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
            `DELETE FROM reservations WHERE id = $1`, [rid]
        )
        if(deleteReservation.rowCount == 0){
            return res.status(404).json({ error: "No Branch Found" });
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