const express = require('express')
const reviewRepo = require('../repository/review.repository')

const router = express.Router()

router.post("/add", reviewRepo.addReview)
router.get("/get/:name", reviewRepo.getReview)
router.put("/edit/:name", reviewRepo.editReview)
router.delete("/delete/:name", reviewRepo.deleteReview)

module.exports = router