const express = require('express')
const branchRepo = require('../repository/branch.repository')
const accessValidation = require('../middleware/authMiddleware')

const router = express.Router()

router.post("/add",accessValidation, branchRepo.createBranch)
router.get("/all",accessValidation, branchRepo.getAllBranch)
router.put("/edit/:bid",accessValidation, branchRepo.editBranch)
router.delete("/delete/:bid",accessValidation, branchRepo.deleteBranch)

module.exports = router