const express = require('express')
const reviewRepo = require('../repository/review.repository')

const router = express.Router()

router.post("/add/:uid", reviewRepo.addReview)
router.get("/get/:uid", reviewRepo.getReview)
router.put("/edit/:uid", reviewRepo.editReview)
router.delete("/delete/:rid", reviewRepo.deleteReview)

module.exports = router