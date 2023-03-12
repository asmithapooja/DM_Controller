const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors =  require("cors");

// Initializing App
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Declaring Routes
const routes = require("./routes/Routes");

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

// Using Routes!
app.use("/", routes);

app.listen(3002, () => {
  console.log("Server is running!");
})