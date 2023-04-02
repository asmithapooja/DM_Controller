const User = require("../models/User");
const Content = require("../models/cs");

const addUser = async (req,res,next) => {
  console.log("Program coming here")
  try{
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      cs: req.params.id
    })
    // If user object created fine, then add the reference to the content schema!
    if(user){
      console.log(user);
      await Content.findByIdAndUpdate({_id: user.cs}, {$push: {user: user._id}});
    }
    await user.save()
    res.status(200).json({
      success: true,
      message: "User added under the provided data server"
    })
  } catch(err){
    res.status(200).json({
      success: false,
      message: "Some internal error occured!"
    })
  }
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

const deleteUser = (req,res,next) => {
  User.findByIdAndDelete(req.params.id)
  .then(data => {
    res.status(200).json({
      success: true,
      message: "User Deleted successfully!"
    })
  })
  .catch(err => {
    res.status(200).json({
      success: false,
      message: "Some internal error occured!"
    })
  })
}

module.exports = {
  addUser, allUsers, updateUser, loginUser, deleteUser
}