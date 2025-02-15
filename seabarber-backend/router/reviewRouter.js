const express = require('express')
const reviewRepo = require('../repository/review.repository')
const accessValidation = require('../middleware/authMiddleware')

const router = express.Router()

router.post("/add",accessValidation, reviewRepo.addReview)
router.get("/get",accessValidation, reviewRepo.getReview)
router.put("/edit",accessValidation, reviewRepo.editReview)
router.delete("/delete/:rid",accessValidation, reviewRepo.deleteReview)

module.exports = router