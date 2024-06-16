const pool = require("../db/instance");

async function addReview(req, res){
    const {name, comment, star} = req.body;

    try{
        const review = await pool.query(
        `INSERT INTO review (name, comment, score) VALUES ($1, $2, $3) RETURNING *`, 
            [name, comment, star]
        );

        res.status(200).json(review.rows);
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    addReview
}