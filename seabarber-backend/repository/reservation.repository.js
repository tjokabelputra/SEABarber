const pool = require("../db/instance");

async function createReservation(req, res){
    const {name, phone, service, dateandtime} = req.body;

    try{
        const reservation = await pool.query(
        `INSERT INTO reservation (name, phone, service, dateandtime) VALUES ($1, $2, $3, $4) RETURNING *`, 
            [name, phone, service, dateandtime]
        );

        res.status(200).json(reservation.rows);
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createReservation,
};