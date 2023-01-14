const authModel = require('../models/users.model')
const resetPasswordModel = require('../models/resetPassword.model')
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
    const user = await authModel.insertUser(req.body)
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

exports.forgotPassword = (req, res) => {
  const { email } = req.body
  authModel.selectUserByEmail(email, (err, { rows: users }) => {
    if (err) {
      return errorHandler(err, res)
    }
    if (users.length) {
      const [user] = users
      const data = {
        email,
        userId: user.id,
        code: Math.ceil(Math.random() * 90000)
      }
      resetPasswordModel.insertResetPassword(data, (err, { rows: results }) => {
        if (results.length) {
          return res.status(200).json({
            success: true,
            message: "Reset Password has been requested"
          })
        }
      })
    } else {
      return res.status(400).json({
        success: false,
        message: "user not found"
      })
    }
  })
}

exports.resetPassword = (req, res) => {
  const { password, confirmPassword } = req.body
  if (password == confirmPassword) {
    resetPasswordModel.selectResetPasswordByEmailAndCode(req.body, (err, data) => {
      if (err) {
        return errorHandler(err, res)
      }
      if (data.rows.length) {
        const [resetRequest] = data.rows
        // console.log(resetRequest)
        const output = {
          id: resetRequest.userId,
          password: password
        }
        authModel.editUser(output, (err, data) => {
          if (err) {
            return errorHandler(err, res)
          }
          if (data.rows.length) {
            resetPasswordModel.removeResetPassword(resetRequest.id, (err, data) => {
              if (data.rows.length) {
                return res.status(200).json({
                  success: true,
                  message: "password updated"
                })
              }
            })
          }
        })
      } else {
        return res.status(400).json({
          success: false,
          message: 'reset request not found'
        })
      }
    })
  } else {
    return res.status(400).json({
      success: false,
      message: 'password and confirm password not match'
    })
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