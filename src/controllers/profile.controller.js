const errorHandler = require("../helpers/errorHandler.helpers")
const {selectUserById, editUser, updateUsers} = require("../models/users.model")
const argon = require('argon2')


exports.readProfile = async (req, res) => {
  try{
    const user = await selectUserById(req.userData.id)
    if(user){
      return res.status(200).json({
        success: true,
        message: "Profile User",
        results: user,
      })
    } else {
      return res.status(400).json({
        success: false,
        message: "User not Found",
      })
    }
  } catch (error) {
    return errorHandler(error, res)
  }
}

exports.updateProfile = async (req, res) => {
  try{
    const {password, confirmPassword} = req.body
    if(req.file){
      req.body.picture = req.file.path
      await selectUserById(req.userData.id)
    }
    if(password === confirmPassword){
      req.body.password = await argon.hash(password)
    }
    const updateUser = await updateUsers(req.body, req.userData.id)
    console.log(req.body)
    return res.status(200).json({
      success: true,
      message: "Profile updated",
      results: updateUser,
    })
  } catch (error) {
    console.log(error)
    // return errorHandler(error, res)
  }
}