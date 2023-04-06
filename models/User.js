const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  permission: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Permission"
  }],
  cs: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Content"
  }
})

module.exports = mongoose.model("User", userSchema);