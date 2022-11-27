const routes = require('express').Router()

routes.use('/users', require('./users.router'))
routes.use('/cinemas', require('./cinemas.route'))
routes.use('/movies', require('./movies.route'))
routes.use('/casts', require('./casts.route'))
routes.use('/genre', require('./genre.route'))

module.exports = routes


