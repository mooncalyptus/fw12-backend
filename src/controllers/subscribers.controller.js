const {displaySubscribers, insertSubscribers, removeSubscribers, editSubscribers} = require('../models/subscribers.model')
const errorHandler = require('../helpers/errorHandler.helpers')

exports.readAllSubscribers = (req, res)=> {
  displaySubscribers((err,data)=> {
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

exports.createSubscribers = (req, res)=> {
  insertSubscribers(req.body, (err,data)=> {
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

exports.updateSubscribers = (req, res)=> {
  editSubscribers(req.params.id, req.body, (err,data)=> {
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

exports.deleteSubscribers = (req,res)=> {
  removeSubscribers(req.params.id, (err, data)=> {
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