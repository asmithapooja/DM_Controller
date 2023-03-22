 const express = require("express");

// Initializing Router 
const router = express.Router();

// Required Models 
const User = require("../models/User");

// Required Controllers
const userController = require("../controller/userController")

// POST Request
router.post("/adduser", userController.addUser);

router.post("/:id/updateuser", userController.updateUser);

router.post("/loginuser", userController.loginUser);

// GET Request
router.get("/alluser", userController.allUsers);

module.exports = router;