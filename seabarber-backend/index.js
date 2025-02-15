require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const functions = require('firebase-functions');

const reservationRouter = require("./router/reservationRouter");
const reviewRouter = require("./router/reviewRouter");
const accountRouter = require("./router/accountRouter")
const branchRouter = require("./router/branchRouter")

const app = express();
const port = process.env.APP_PORT || 3000
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())

app.use("/account", accountRouter)
app.use("/branch", branchRouter)
app.use("/reservation", reservationRouter)
app.use("/review", reviewRouter)

app.listen(port, () => {
    console.log("Server is running and listening on port", port)
})

//exports.api = functions.https.onRequest(app)