const {insertGenre, removeGenre, displayGenre, editGenre} = require('../models/genre.model')

exports.readAllGenre = (req, res) => {
  // console.log(req.query)
  displayGenre((err, data)=> {
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

exports.createGenre = (req, res)=> {
  insertGenre(req.body, (err,data)=>{
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

exports.updateGenre = (req, res)=> {
  editGenre(req.body, (err,data)=> {
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

exports.deleteGenre = (req,res)=> {
  removeGenre(req.params.id, (err, data)=> {
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