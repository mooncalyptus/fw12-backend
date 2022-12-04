const {insertMovieSchedule, removeMovieSchedule, displayMovieSchedule, editMovieSchedule} = require('../models/movieSchedule.models')
const errorHandler = require ('../helpers/errorHandler.helpers')
exports.readAllMovieSchedule = (req, res) => {
  displayMovieSchedule((err, data)=> {
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

exports.createMovieSchedule = (req, res)=> {
  insertMovieSchedule(req.body, (err,data)=>{
    if(err){
      console.log(err)
      return errorHandler(err,res)
  }
  return res.status(200).json({
    success: true,
    message: "User created successfully",
    results: data.rows
  })
  })
}

exports.updateMovieSchedule = (req, res)=> {
  editMovieSchedule(req.body, (err,data)=> {
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

exports.deleteMovieSchedule = (req,res)=> {
  removeMovieSchedule(req.params.id, (err, data)=> {
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