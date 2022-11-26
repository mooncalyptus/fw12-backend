const routes = require('express').Router()

routes.use('/users', require('./users.router'))
routes.use('/cinemas', require('./cinemas.route'))
routes.use('/movies', require('./movies.route'))

module.exports = routes


