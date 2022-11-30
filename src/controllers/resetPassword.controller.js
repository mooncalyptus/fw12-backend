const {displayResetPassword, insertResetPassword, removeResetPassword, editResetPassword} = require('../models/resetPassword.model')
const errorHandler = require('../helpers/errorHandler.helpers')

exports.readResetPassword = (req, res)=> {
  displayResetPassword((err,data)=> {
    if(err){
      console.log(err)
      return res.status(500).json({
        success: false,
        message: 'Something happen in our backend',
      })
    }

    return res.status(200).json({
      success: true,
      result: data.rows
     })
  })
}

exports.createResetPassword = (req, res)=> {
  insertResetPassword(req.body, (err,data)=> {
    if(err){
      console.log(err)
      return res.status(500).json({
        success: true,
        message: "User created failed"
      })
    }
    return res.status(200).json({
      success: true,
      message: "User created successfully",
      results: data.rows[0]
    })
  })
}

exports.updateResetPassword = (req, res)=> {
  editResetPassword(req.params.id, req.body, (err,data)=> {
    if(err){
      console.log(err)
      return res.status(500).json({
        success: false,
        message: 'Something happen in our backend',
      })
    }
    return res.status(200).json({
      success: true,
      message: 'User updated successfully'
    })
  })
}

exports.deleteResetPassword = (req,res)=> {
  removeResetPassword(req.params.id, (err, data)=> {
    if(err){
      console.log(err)
      return res.status(500).json({
        success: false,
        message: 'Something happen in our backend',
      })
    }
    return res.status(200).json({
      success: true,
      message: "Data deleted successfully"
    })
  })
}