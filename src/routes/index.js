const routes = require('express').Router()

routes.use('/users', require('./users.router'))
routes.use('/cinemas', require('./cinemas.route'))

module.exports = routes


