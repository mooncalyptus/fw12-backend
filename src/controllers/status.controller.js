const {displayStatus, insertStatus, removeStatus, editStatus} = require('../models/status.model')
const errorHandler = require('../helpers/errorHandler.helpers')

exports.readAllStatus = (req, res)=> {
  displayStatus((err,data)=> {
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

exports.createStatus = (req, res)=> {
  insertStatus(req.body, (err,data)=> {
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

exports.updateStatus = (req, res)=> {
  editStatus(req.params.id, req.body, (err,data)=> {
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

exports.deleteStatus = (req,res)=> {
  removeStatus(req.params.id, (err, data)=> {
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