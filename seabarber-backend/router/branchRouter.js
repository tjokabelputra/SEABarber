const express = require('express')
const branchRepo = require('../repository/branch.repository')

const router = express.Router()

router.post("/add", branchRepo.createBranch)
router.get("/all", branchRepo.getAllBranch)
router.put("/edit/:id", branchRepo.editBranch)
router.delete("/delete/:id",branchRepo.deleteBranch)

module.exports = router