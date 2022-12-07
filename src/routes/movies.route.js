const { upcoming } = require('../controllers/auth.controller')
const {readAllMovies, createMovies, updateMovies, deleteMovies, nowShowing} = require('../controllers/movies.controller')
const authMiddleware = require('../middleware/auth.middleware')
const uploadMiddleware = require('../middleware/upload.middleware')

const moviesRouters = require('express').Router()

moviesRouters.get('/', readAllMovies)
moviesRouters.get('/upcoming', upcoming)
moviesRouters.get('/nowShowing', nowShowing)
moviesRouters.post('/', createMovies)
moviesRouters.patch('/:id', uploadMiddleware, updateMovies)
moviesRouters.delete('/:id', deleteMovies)
module.exports = moviesRouters