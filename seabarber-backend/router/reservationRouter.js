const express = require('express')
const reservationRepo = require('../repository/reservation.repository')
const accessValidation = require('../middleware/authMiddleware')

const router = express.Router()

router.post("/add",accessValidation, reservationRepo.createReservation)
router.get("/all",accessValidation, reservationRepo.getAllReservation)
router.get("/id/:rid",accessValidation, reservationRepo.getReservationById)
router.get("/user",accessValidation, reservationRepo.getReservationByAccount)
router.get("/branch/:bid",accessValidation, reservationRepo.getReservationByBranch)
router.put("/edit/:rid",accessValidation, reservationRepo.updateReservation)
router.delete("/delete/:rid",accessValidation, reservationRepo.deleteReservation)

module.exports = router