const { login } = require('../controllers/auth.controller')

const auth = require('express').Router()

auth.post('/login', login)
module.exports = auth