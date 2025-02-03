const pool = require("../db/instance");
const crypto = require('crypto');

async function createAccount(req, res){
    const {full_name, email, phone, password} = req.body;
    const hash = crypto.createHash('sha256').update(password).digest('hex');
    const role = 'Customer';

    try{
        const account = await pool.query(
        `INSERT INTO users (full_name, email, phone, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *`, 
            [full_name, email, phone, hash, role]
        );

        res.status(200).json(account.rows);
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}

async function login(req, res) {
    const { email, password } = req.body;
    const hash = crypto.createHash('sha256').update(password).digest('hex');

    try {
        const user = await pool.query(
            `SELECT * FROM users WHERE email = $1 AND password = $2`,
            [email, hash]
        );

        if (user.rows.length === 0) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        res.status(200).json(user.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAccountDetail(req, res){
    const { id } = req.params;
    
    try{
        const account = await pool.query(
            `SELECT * FROM users WHERE id = $1`,
            [id]
        )
        res.status(200).json(account.rows[0]);
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}

async function logout(req, res){
    const { id } = req.params;
    const { full_name, email, phone, password } = req.body;

    try{
        const account = await pool.query(
            `SELECT * FROM users WHERE id = $1 AND full_name = $2 AND email = $3 AND phone = $4 AND password = $5`,
            [id, full_name, email, phone, password]
        )
        if(account.rows.length > 0){
            res.status(200).json({ message: "Log Out Successfully" });
        }
        else{
            res.status(404).json({ error: "No Account Found" });
        }
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createAccount,
    login,
    getAccountDetail,
    logout
}