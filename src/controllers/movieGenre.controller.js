const {insertMovieGenre, updateMovieGenre, deleteMovieGenre, displayMovieGenre} = require('../models/moviesGenre.models')
const errorHandler = require('../helpers/errorHandler.helpers')

exports.readAllMovieGenre = (req, res) => {
  displayMovieGenre((err, data)=> {
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

exports.createMovieGenre = (req, res)=> {
  insertMovieGenre(req.body, (err,data)=>{
    if(err){
      console.log(err)
      return errorHandler(err,res)
  }
  return res.status(200).json({
    success: true,
    message: "Data created successfully",
    results: data.rows
  })
  })
}

exports.updateMovieGenre = (req, res)=> {
  updateMovieGenre(req.params.id, req.body, (err,data)=> {
    if(err){
      console.log(err)
      return res.status(500).json({
        success: false,
        message: 'Something happen in our backend',
      })
    }
    return res.status(200).json({
      success: true,
      message: 'Data updated successfully',
      results: data.rows[0]
    })
  })
}

exports.deleteMovieGenre = (req,res)=> {
  deleteMovieGenre(req.params.id, (err, data)=> {
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