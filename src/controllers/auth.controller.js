const authModel = require('../models/users.model')
const forgotPasswordModel = require('../models/forgotPassword.models')
const movieModel = require('../models/movies.models')
const errorHandler = require('../helpers/errorHandler.helpers')
const jwt = require('jsonwebtoken')
const argon = require('argon2')


exports.login = async(req, res) => {
  try{
    const user = await authModel.selectUserByEmail(req.body.email)
    const token = jwt.sign({id: user.id}, 'backend-secret')
    if(await argon.verify(user.password, req.body.password)){
      return res.status(200).json({
        success: true,
        message: "Login success",
        results: {
          token,
        }
      })
    } else {
      return res.status(400).json({
        success: false,
        message: "Wrong email or Password"
      })
    }
  } catch (err){
    if(err) errorHandler(err, res)
  }
}


exports.register = async (req, res) => {
  try {
    req.body.password = await argon.hash(req.body.password)
    const user = await authModel.createUsers(req.body)
    const token = jwt.sign({ id: user.id }, "backend-secret")
    return res.status(200).json({
      success: true,
      message: "Registered success",
      results: { token }
    })
  } catch(error){
    console.log(error)
    if(error) errorHandler(error, res)
  }
}


exports.forgotPassword = async (req, res) => {
  try{
    const {email} = req.body;
    const user = await authModel.selectUserByEmail(email)
    if(user){
      const data = {
        email,
        userId: user.id,
        code: Math.ceil(Math.random() * 90000 + 10000)
      }
      const requestResetPassword = await forgotPasswordModel.createForgotPassword(data);
      return res.status(200).json({
        success: true,
        message: "Reset password has been requested",
      })
    } else {
      return res.status(400).json({
        success: true,
        message: "Request failed, user doesn't exist"
      })
    }
  } catch (error){
    return errorHandler(error,res)
  }
}

exports.resetPassword = async (req, res) => {
  try{
    const {password, confirmPassword} = req.body
    if(password === confirmPassword){
      const resetRequest = await forgotPasswordModel.selectForgotPasswordByEmailAndCode(req.body)
      if(resetRequest){
        console.log(resetRequest)
        if(new Date(resetRequest.createdAt).getTime() + 15 * 60 * 1000 < new Date().getTime()){
          throw Error ('Code Expired')
        }
        const data = {
          id: resetRequest.userId,
          password: await argon.hash(password)
        }

        const user = await authModel.updateUsers(data, resetRequest.userId)
        const forgotPassword = await forgotPasswordModel.deleteForgotPassword(resetRequest.id)
        return res.status(200).json({
          success: true,
          message: "Password success updated"
        })
      }
    }else{
      return res.status(401).json({
        success: false,
        message: "Password and confirm password not match"
      })
    }
  } catch (error){
    console.log(error)
    return errorHandler(error, res)
  }
}
exports.upcoming = (req, res) => {
  movieModel.upcomingMovie(req.query, (err, data) => {
    if (err) {
      console.log(err)
      return errorHandler(err, res)
    }
    return res.json({
      success: true,
      message: "showed",
      results: data.rows,
    })
  })
}