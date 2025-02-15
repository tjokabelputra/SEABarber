const express = require('express')
const accountRepo = require('../repository/account.repository')

const router = express.Router()

router.post("/register", accountRepo.createAccount)
router.post("/login", accountRepo.login)
router.post("/logout/:id", accountRepo.logout)
router.get("/detail/:id", accountRepo.getAccountDetail)

module.exports = router