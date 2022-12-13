const transactionsModel = require('../models/transactions.model')
const errorHandler = require('../helpers/errorHandler.helpers')

exports.createTransactions = (req, res)=>{
   return transactionsModel.insertOrder(req.body, (err, data)=> {
    if(err){
      console.log(err)
        return errorHandler(err, res);
    }
    return res.status(200).json({
        success: true,
        message: "Data added successfully",
        results: data.rows
      })
    })
}