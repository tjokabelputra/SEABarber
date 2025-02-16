const express = require('express')
const { check } = require('express-validator')
const accountRepo = require('../repository/account.repository')
const accessValidation = require('../middleware/authMiddleware')

const router = express.Router()

router.post("/register",
    [
        check('username')
            .not().isEmpty(),
        check('email')
            .isEmail()
            .not().isEmpty(),
        check('phone')
            .not().isEmpty(),
        check('password')
            .isLength({ min: 8})
            .not().isEmpty()
    ] ,accountRepo.createAccount)
router.post("/login",
    [
        check('email')
            .isEmail()
            .not().isEmpty(),
        check('password')
            .isLength({ min: 8})
            .not().isEmpty()
    ] ,accountRepo.login)
router.post("/logout",accessValidation ,accountRepo.logout)
router.get("/detail/:id", accountRepo.getAccountDetail)

module.exports = router