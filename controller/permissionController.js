const Permission = require("../models/Permissions");

const User = require("../models/User");

const permissions = ["View", "Edit", "Download", "Delete"];


// Add permissions to the respective user!
const addPermissions = async (req,res,next) => {
  try{
    const perm = new Permission({
      permission: req.body.permission,
      user: req.body.user
    })
    
    // If perm object exists!
    if(perm){
      await User.findByIdAndUpdate({_id: perm.user}, {$push: {permission: perm._id}});
    }
    
    await perm.save()
    res.status(200).json({
      success: true,
      message: "Permission added to the respective user!"
    })
    
  } catch(err){
    res.status(200).json({
      success: false,
      message: "Some internal error occured!"
    })
  }
}

// Send all permissions to the client to choose!
const permission = async (req,res,next) => {
  res.status(200).json({
    success: true,
    message: permissions
  })
}

// View all users permissions!
const allPermissions = async (req,res,next) => {
  Permission.find({})
    .then(data => {
      res.status(200).json({
        success: true,
        message: data
      })
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        message: "Some server error occured!"
      })
    })
}

// Delete permission for the specific user!
const deletePermission = (req,res,next) => {
  Permission.findByIdAndDelete(req.body.permId)
    .then(async data => {
      await User.findByIdAndUpdate({_id: req.body.userid}, {$pull: {permission: req.body.permId}})
      res.status(200).json({
        success: true,
        message: "Permissions deleted for the user!"
      })
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        message: "Some internal error occured!"
      })
    })
}

const deleteAll = (req,res,next) => {
  Permission.deleteMany({})
    .then(data => {
      res.status(200).json({
        success: true,
        message: "Permissions deleted!"
      })
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        message: "Some internal error occured!"
      })
    })
}


module.exports = {
  addPermissions, allPermissions, permission, deletePermission, deleteAll
}