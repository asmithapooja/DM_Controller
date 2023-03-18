const User = require("../models/User");

const addUser = (req,res,next) => {
  const user = new User({
    cs: req.body.cs,
    password: req.body.password
  })
  user.save()
    .then(data => {
      res.status(200).json({
        success: true,
        message: "User has been added"
      })
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        message: "Some internal problem occured!"
      })
    })
}

const loginUser = (req,res,next) => {
  try{
    password = req.body.password,
    cs = req.body.cs 
    User.findOne({cs: cs})
      .then(data => {
        if(data){
          if(data.password !== password){
            res.status(401).json({
              success: false,
              message: "Incorrect Password"
            })
          } else {
            res.status(200).json({
              success: true,
              message: "User Found",
              cs : data.cs,
              authId: data._id
            })
          }
        } else {
          res.status(404).json({
            success: false,
            message: "User not found"
          })
        }
      })
  } catch(err){
    res.status(404).json({
      success: false,
      message: "Some inernal error occured!"
    })
  }
}

const allUsers = (req,res,next) => {
  User.find({})
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

const updateUser = (req,res,next) => {
  User.findByIdAndUpdate(req.params.id,{
    cs: req.body.cs,
    password: req.body.password
  })
  .then(data => {
    res.status(200).json({
      success: true,
      message: "User Updated!"
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
  addUser, allUsers, updateUser, loginUser
}