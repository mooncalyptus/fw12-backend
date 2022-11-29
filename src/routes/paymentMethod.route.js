const {readAllPayment, createPayment, updatePayment, deletePayment} = require('../controllers/paymentMethod.controller')

const paymentRouters = require('express').Router()

paymentRouters.get('/', readAllPayment)
paymentRouters.post('/', createPayment)
paymentRouters.patch('/:id', updatePayment)
paymentRouters.delete('/:id', deletePayment)
module.exports = paymentRouters