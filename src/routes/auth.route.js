const { login, register } = require('../controllers/auth.controller')

const auth = require('express').Router()

auth.post('/login', login)
auth.post('/register', register)
module.exports = auth