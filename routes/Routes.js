 const express = require("express");

// Initializing Router 
const router = express.Router();

// Required Models 
const User = require("../models/User");

// Required Controllers
const userController = require("../controller/userController");
const contentController = require("../controller/Content/contentController");
const permissionController = require("../controller/permissionController");

// POST Request
router.post("/:id/adduser", userController.addUser);

router.post("/:id/updateuser", userController.updateUser);

router.post("/:id/loginuser", userController.loginUser);

router.post("/:id/deleteuser", userController.deleteUser);

// POST request for data server!
router.post("/:id/addcontent", contentController.addCs);

router.post("/:id/updatedataserver", contentController.updateDataServer);

// GET Request for all the servers
router.get("/alluser", userController.allUsers);

// POST request for permission
router.post("/addpermission", permissionController.addPermissions);

router.get("/allpermissionusers", permissionController.allPermissions);

router.get("/permissions", permissionController.permission);

router.post("/deletepermission", permissionController.deletePermission);

router.post("/deleteallpermission", permissionController.deleteAll);

router.get("/alldataserver", contentController.allDataServer);

module.exports = router;