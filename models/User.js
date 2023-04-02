const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  cs: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Content"
  }
})

module.exports = mongoose.model("User", userSchema);