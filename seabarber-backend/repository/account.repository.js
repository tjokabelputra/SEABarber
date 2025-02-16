const pool = require("../db/instance");
const { validationResult } = require('express-validator')
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

async function createAccount(req, res){
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        console.log(errors)
        return res.status(422).json({ error: "Invalid Input, please check your data" })
    }

    const {username, email, phone, password} = req.body;
    const hash = crypto.createHash('sha256').update(password).digest('hex');
    const role = 'Customer';

    try{
        const checkAccount = await pool.query(
            `SELECT * FROM users WHERE email = $1`,[email]
        )

        if(checkAccount.rows.length > 0){
            return res.status(400).json({ error: "User Already Exist" })
        }

        const newAccount = await pool.query(
        `INSERT INTO users (username, email, phone, password, role) 
        VALUES ($1, $2, $3, $4, $5) RETURNING *`, 
            [username, email, phone, hash, role]
        );

        res.status(201).json({message: "Account Created Successfully", account: newAccount.rows });
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}

async function login(req, res) {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        console.log(errors)
        return res.status(422).json({ error: "Invalid Input, please check your data" })
    }

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
        else{
            const payload = {
                id: user.rows[0].id,
                username: user.rows[0].username,
                email: user.rows[0].email,
                phone: user.rows[0].phone,
                role: user.rows[0].role
            }

            const secret = process.env.JWT_SECRET
            const token = jwt.sign(payload, secret, { expiresIn: "30m"})

            return res.status(200).json({
                account: {
                    id: user.rows[0].id,
                    username: user.rows[0].username,
                    email: user.rows[0].email,
                    phone: user.rows[0].phone,
                    role: user.rows[0].role
                },
                token: token
            })
        }
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
    return res.status(200).json({ message: "Logged Out Successfully" })
}

module.exports = {
    createAccount,
    login,
    getAccountDetail,
    logout
}