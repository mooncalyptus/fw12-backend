const {readAllTransactions, createTransactions} = require('../controllers/transactions.controller')

const transactionRoutes = require('express').Router()

transactionRoutes.get('/', readAllTransactions)
transactionRoutes.post('/createtransactions', createTransactions )

module.exports = transactionRoutes