const transactions = require('express').Router()
const {createTransactions} = require('../controllers/transactions.controller')

transactions.post('/', createTransactions)

module.exports = transactions