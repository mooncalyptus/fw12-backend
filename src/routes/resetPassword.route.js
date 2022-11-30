const {readAllResetPassword, createResetPassword, updateResetPassword, deleteResetPassword} = require('../controllers/resetPassword.controller')

const resetPasswordRouters = require('express').Router()

resetPasswordRouters.get('/', readAllResetPassword)
resetPasswordRouters.post('/', createResetPassword)
resetPasswordRouters.patch('/:id', updateResetPassword)
resetPasswordRouters.delete('/:id', deleteResetPassword)
module.exports = resetPasswordRouters