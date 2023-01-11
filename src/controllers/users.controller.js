const {insertUser, removeUser, displayUser, editUser} = require('../models/users.model')
const errorHandler = require('../helpers/errorHandler.helpers')
exports.readAllUsers = (req, res) => {
  displayUser(req.query, (err, data)=> {
    if(err){
      console.log(err)
      return res.status(500).json({
        success: false,
        message: 'Something happen in our backend',
      })
    }
    return res.status(200).json({
      success: true,
      results: data.rows
    })
  })
}

exports.readUser = (req, res) => {
  console.log(req.params.id)
  return res.status(200).json({
    success: true,
    message: "Detail users"
  })
}
exports.createUser = (req, res)=> {
  if(req.file){
    // console.log(req.file)
    req.body.picture = req.file.filename
  }
  insertUser(req.body, (err,data)=>{
    if(err){
      errorHandler(err,res)
  }
  return res.status(200).json({
    success: true,
    message: "User created successfully",
    results: data.rows[0]
  })
  })
}

exports.updateUser = (req, res)=> {
  if(req.file){
    console.log(req.file)
    req.body.picture = req.file.filename
  }
  editUser(req.params.id, req.body, (err,data)=> {
    if(err){
      // console.log(err)
      return res.status(500).json({
        success: false,
        message: 'Something happen in our backend',
      })
    }
    return res.status(200).json({
      success: true,
      message: 'User updated successfully',
      results: data.rows[0]
    })
  })
}

exports.deleteUsers = (req,res)=> {
  removeUser(req.params.id, (err, data)=> {
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