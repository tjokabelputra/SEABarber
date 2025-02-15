const express = require('express')
const reservationRepo = require('../repository/reservation.repository')

const router = express.Router()

router.post("/add", reservationRepo.createReservation)
router.get("/all", reservationRepo.getAllReservation)
router.get("/id/:rid", reservationRepo.getReservationById)
router.get("/user/:uid", reservationRepo.getReservationByAccount)
router.get("/branch/:bid", reservationRepo.getReservationByBranch)
router.put("/edit/:rid", reservationRepo.updateReservation)
router.delete("/delete/:rid", reservationRepo.deleteReservation)

module.exports = router