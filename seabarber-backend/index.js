const express = require("express");
const bodyParser = require('body-parser');
require("dotenv").config();
var cors = require("cors");

const reservationRepo = require("./repository/reservation.repository");
const reviewRepo = require("./repository/review.repository");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())

app.post("/reserve", reservationRepo.createReservation);
app.post("/review", reviewRepo.addReview);

app.listen(port, () => {
    console.log("Server is running and listening on port", port);
});