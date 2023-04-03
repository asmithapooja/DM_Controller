const User = require("../models/User");
const Content = require("../models/cs");


// Add New Users
const addUser = async (req,res,next) => {
  try{
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      cs: req.params.id
    })
    // If user object created fine, then add the reference to the content schema!
    if(user){
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


// Login User
const loginUser = async (req,res,next) => {
  try{
    let username = req.body.username
    let password = req.body.password
    let content = req.params.id
    
    await User.findOne({username: username})
    .then(async data => {
      let dataId = await dataServerId(content);
      if(data){
        if(data.cs.toString() === dataId){
          if(data.password !== password){
            res.status(401).json({
              success: false,
              message: "Please check your crendetials"
            })
          } else {
            res.status(200).json({
              success: true,
              message: "Login Success",
              username: data.username,
              dataServer: data.cs
            })
          }
        } else {
          res.status(404).json({
            success: false,
            messgae: "Data server not found"
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

// Find Data Server Id by data server address!
async function dataServerId(dataAdd){
  const result = await Content.findOne({cs: dataAdd});
  return result._id.toString();
}


// All Users
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
    res.status(400).json({
      success: false,
      message: "Some internal error occured!"
    })
  })
}

module.exports = {
  addUser, allUsers, updateUser, loginUser, deleteUser
}