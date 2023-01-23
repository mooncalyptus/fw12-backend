const routes = require('express').Router()
const authMiddleware = require('../middleware/auth.middleware')

routes.use('/users', require('./users.router'))
routes.use('/cinemas', require('./cinemas.route'))
routes.use('/movies', require('./movies.route'))
routes.use('/movieSchedule', require('./movieSchedule.route'))
routes.use('/movieGenre', require('./movieGenre.route'))
routes.use('/casts', require('./casts.route'))
routes.use('/genre', require('./genre.route'))
routes.use('/payment', require('./paymentMethod.route'))
routes.use('/status', require('./status.route'))
routes.use('/subscribers', require('./subscriber.route'))
routes.use('/auth', require('./auth.route'))
routes.use('/profile', authMiddleware, require('./profile.route'))
routes.use('/transactions', require('./transactions.route'))
module.exports = routes


