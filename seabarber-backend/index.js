const express = require("express");
const bodyParser = require('body-parser');
require("dotenv").config();
var cors = require("cors");

const reservationRepo = require("./repository/reservation.repository");
const reviewRepo = require("./repository/review.repository");
const accountRepo = require("./repository/account.repository")
const branchRepo = require("./repository/branch.repository")

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())

app.post("/reserve", reservationRepo.createReservation);
app.get("/allReservation", reservationRepo.getAllReservation);

app.post("/review", reviewRepo.addReview);
app.get("/getReview/:name", reviewRepo.getReview);
app.put("/editReview/:name", reviewRepo.editReview);
app.delete("/deleteReview/:name", reviewRepo.deleteReview);

app.post("/register", accountRepo.createAccount);
app.post("/login", accountRepo.login);
app.post("/logout/:id", accountRepo.logout)
app.get("/detail/:id", accountRepo.getAccountDetail);

app.post("/addBranch", branchRepo.createBranch);
app.get("/allBranch", branchRepo.getAllBranch);
app.put("/editBranch/:id", branchRepo.editBranch);
app.delete("/deleteBranch/:id", branchRepo.deleteBranch);

app.listen(port, () => {
    console.log("Server is running and listening on port", port);
});