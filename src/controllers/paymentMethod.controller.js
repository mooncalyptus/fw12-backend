const {displayPayment, insertPayment, removePayment, editPayment} = require('../models/paymentMethod.model')
const errorHandler = require('../helpers/errorHandler.helpers')

exports.readAllPayment = (req, res)=> {
  displayPayment((err,data)=> {
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

exports.createPayment = (req, res)=> {
  insertPayment(req.body, (err,data)=> {
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

exports.updatePayment = (req, res)=> {
  editPayment(req.params.id, req.body, (err,data)=> {
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

exports.deletePayment = (req,res)=> {
  removePayment(req.params.id, (err, data)=> {
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