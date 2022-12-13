const transactions = require('express').Router()
const {createTransactions} = require('../controllers/transactions.controller')

transactions.post('/createtransactions', createTransactions)

module.exports = transactions