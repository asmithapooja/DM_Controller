const express = require("express");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const server = require("../routes/Routes");

const dataLake = "mongodb+srv://salman:pamelia@cluster0.khypon5.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(dataLake, {
  useNewUrlParser: true,
})

mongoose.connection.on("connected", () => {
  console.log("Database connected!");
})

mongoose.connection.on("error", (err) => {
  console.log("Some error occured in the database", err);
})

app.use("/.netlify/functions/server", server);

// app.listen(3002,() => {
//     console.log("Server is running at port 3002");
// })

module.exports.handler = serverless(app);