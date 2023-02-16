const {displayCinemas, insertCinemas, removeCinemas, editCinemas, selectCinemas} = require('../models/cinemas.models')
const errorHandler = require('../helpers/errorHandler.helpers')

exports.readAllCinemas = (req, res)=> {
  displayCinemas((err,data)=> {
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

exports.selectCinemas = (req, res) => {
selectCinemas(req.params.id, req.query.date, req.query.city, (err, data) => {
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

exports.createCinemas = (req, res)=> {
  insertCinemas(req.body, (err,data)=> {
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

exports.updateCinemas = (req, res)=> {
  editCinemas(req.params.id, req.body, (err,data)=> {
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

exports.deleteCinemas = (req,res)=> {
  removeCinemas(req.params.id, (err, data)=> {
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