const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  cs: String,
  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]
})

module.exports = mongoose.model("Content", contentSchema);