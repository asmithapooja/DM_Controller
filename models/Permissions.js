const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema({
  permission: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
})

module.exports = mongoose.model("Permission", permissionSchema);