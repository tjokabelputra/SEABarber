const pool = require("../db/instance");

async function addReview(req, res){
    const {name, comment, star} = req.body;

    if(name === ''){
        return res.status(400).json({ message: "Please Enter Your Name" });
    }
    else if(comment === ''){
        return res.status(400).json({ message: "Please Enter Your Comment" });
    }
    else if(star === 0){
        return res.status(400).json({ message: "Please Enter The Score" });
    }

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

async function getReview(req, res) {
    const { name } = req.params;

    try {
        const userReview = await pool.query(
            `SELECT * FROM review WHERE name = $1`,
            [name]
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
    const { name } = req.params;
    const { comment, score } = req.body;

    try{
        const updatedReview = await pool.query(
            `UPDATE review SET comment = $1, score = $2 WHERE name = $3 RETURNING *`,
            [comment, score, name]
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
    const { name } = req.params;
    
    try{
        const deletedReview = await pool.query(
            `DELETE FROM review WHERE name = $1`,
            [name]
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