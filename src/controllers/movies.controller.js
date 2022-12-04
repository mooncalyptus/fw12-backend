const {displayMovies, insertMovies, removeMovies, editMovies, nowShowingMovie} = require('../models/movies.models')

exports.readAllMovies = (req, res)=> {
  console.log(req.userData)
  req.query.limit = parseInt(req.query.limit) || 5
  req.query.page = parseInt(req.query.page) || 1
  const filter = {
    limit: req.query.limit,
    offset: (parseInt(req.query.page) - 1) * req.query.limit
  }

  displayMovies(filter, (err, data)=> {
    if(err){
      console.log(err)
      return res.status(500).json({
        success: false,
        message: 'Something happen in our backend'
      })
    }
    return res.status(200).json({
      success: true,
      result: data.rows
    })
  })
}

exports.createMovies = (req, res)=> {
  insertMovies(req.body, (err, data)=> {
    if(err){
      console.log(err)
      return res.status(500).json({
        success: false,
        message: "Data created failed"
      })
    }
    return res.status(200).json({
      success: true,
      message: "Data created successfully",
      results: data.rows[0]
    })
  })
}

exports.updateMovies = (req, res)=> {
  editMovies(req.params.id, req.body, (err,data)=> {
    if(err){
      console.log(err)
      return res.status(500).json({
        success: false,
        message: 'Something happen in our backend',
      })
    }
    return res.status(200).json({
      success: true,
      message: 'Data updated successfully'
    })
  })
}

exports.deleteMovies = (req,res)=> {
  removeMovies(req.params.id, (err, data)=> {
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

exports.nowShowing = (req, res)=> {
nowShowingMovie((err, data)=> {
  if(err){
    return res.status(500).json({
      success: false,
      message: 'Something happen in our backend'
    })
  }
  return res.status(200).json({
    success: true,
    message: 'Showed',
    results : data.rows
  })
})
}