const routes = require('express').Router()
const authMiddleware = require('../middleware/auth.middleware')

routes.use('/users', require('./users.router'))
routes.use('/cinemas', require('./cinemas.route'))
routes.use('/movies', authMiddleware, require('./movies.route'))
routes.use('/casts', require('./casts.route'))
routes.use('/genre', require('./genre.route'))
routes.use('/auth', require('./auth.route'))

module.exports = routes


