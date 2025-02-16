const express = require('express')
const branchRepo = require('../repository/branch.repository')
const accessValidation = require('../middleware/authMiddleware')
const { check } = require('express-validator')

const router = express.Router()

router.post("/add",
    [
        check("name")
            .not().isEmpty(),
        check("location")
            .not().isEmpty(),
        check("open_time")
            .not().isEmpty(),
        check("closing_time")
            .not().isEmpty()
    ],accessValidation, branchRepo.createBranch)
router.get("/all",accessValidation, branchRepo.getAllBranch)
router.get("/id/:bid", accessValidation, branchRepo.getBranchById)
router.put("/edit/:bid",accessValidation, branchRepo.editBranch)
router.delete("/delete/:bid",accessValidation, branchRepo.deleteBranch)

module.exports = router