const {insertCasts, removeCasts, displayCasts, editCasts} = require('../models/casts.model')

exports.readAllCasts = (req, res) => {
  // console.log(req.query)
  req.query.page = parseInt(req.query.page) || 1
  req.query.limit = parseInt(req.query.limit) || 5
  req.query.search = req.query.search || ''
  req.query.sortBy = req.query.sortBy || 'createdAt'
  req.query.sort = req.query.sort || 'ASC'
  const filter = {
    limit: req.query.limit,
    offset: (parseInt(req.query.page) - 1) * req.query.limit,
    search: req.query.search,
    sort: req.query.sort,
    sortBy: req.query.sortBy
  }
  displayCasts(filter, (err, data)=> {
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

exports.createCasts = (req, res)=> {
  insertCasts(req.body, (err,data)=>{
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

exports.updateCasts = (req, res)=> {
  editCasts(req.body, (err,data)=> {
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

exports.deleteCasts = (req,res)=> {
  removeCasts(req.params.id, (err, data)=> {
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