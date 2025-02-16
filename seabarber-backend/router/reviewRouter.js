const express = require('express')
const reviewRepo = require('../repository/review.repository')
const accessValidation = require('../middleware/authMiddleware')
const { check } = require("express-validator")

const router = express.Router()

router.post("/add",
    [
        check("comment")
            .not().isEmpty(),
        check("star")
            .isInt({ min: 1, max: 5 })
    ],accessValidation, reviewRepo.addReview)
router.get("/get",accessValidation, reviewRepo.getReview)
router.put("/edit",accessValidation, reviewRepo.editReview)
router.delete("/delete",accessValidation, reviewRepo.deleteReview)

module.exports = router