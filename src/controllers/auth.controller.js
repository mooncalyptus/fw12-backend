const authModel = require('../models/users.model')
const jwt = require('jsonwebtoken')
// const { RowDescriptionMessage } = require('pg-protocol/dist/messages')
exports.login = (req,res)=> {
  authModel.selectUserByEmail(req.body.email, (err, {rows})=> {
    if(rows.length){
      const [user] = rows
      if(req.body.password === user.password){
        const token = jwt.sign({id: user.id}, 'backend-secret')
        return res.status(200).json({
          success: true,
          message: 'login success',
          results : {
            token
          }
        })
      }
    }
    return res.status(401).json({
      success: false,
      message: 'wrong email/password'
    })
  })
}

exports.register = (req,res)=> {
authModel.insertUser(req.body, (err,data)=>{
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