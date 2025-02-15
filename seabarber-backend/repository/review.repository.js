const pool = require("../db/instance");

async function addReview(req, res){
    const uid = req.userData.id
    const {comment, star} = req.body;

    if(comment === ''){
        return res.status(400).json({ message: "Please Enter Your Comment" });
    }
    else if(star === 0){
        return res.status(400).json({ message: "Please Enter The Score" });
    }

    try{
        const review = await pool.query(
        `INSERT INTO reviews (user_id, comment, score) VALUES ($1, $2, $3) RETURNING *`, 
            [uid, comment, star]
        );

        res.status(200).json(review.rows[0]);
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}

async function getReview(req, res) {
    const uid = req.userData.id

    try {
        const userReview = await pool.query(
            `SELECT * FROM reviews WHERE user_id = $1`,
            [uid]
        );
        if (userReview.rows.length === 0) {
            return res.status(404).json({ message: "No Review Found" });
        }
        res.status(200).json(userReview.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


async function editReview(req, res){
    const uid = req.userData.id
    const { comment, score } = req.body;

    try{
        const updatedReview = await pool.query(
            `UPDATE reviews SET comment = $1, score = $2 WHERE user_id = $3 RETURNING *`,
            [comment, score, uid]
        )
        if(updatedReview.rows.length == 0){
            return res.status(404).json({ message: "No Review Found" });
        }
        res.status(200).json(updatedReview.rows[0])
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}

async function deleteReview(req, res){
    const { rid } = req.params;
    
    try{
        const deletedReview = await pool.query(
            `DELETE FROM reviews WHERE id = $1`,
            [rid]
        )
        if (deletedReview.rowCount == 0) {
            return res.status(404).json({ message: "No Review Found" });
        } 
        res.status(200).json({ message: "Review Deleted Successfully", deletedReview: deletedReview.rows[0] });
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    addReview,
    getReview,
    editReview,
    deleteReview
}