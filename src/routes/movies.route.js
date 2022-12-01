const { upcoming } = require('../controllers/auth.controller')
const {readAllMovies, createMovies, updateMovies, deleteMovies} = require('../controllers/movies.controller')
const authMiddleware = require('../middleware/auth.middleware')

const moviesRouters = require('express').Router()

moviesRouters.get('/', readAllMovies)
moviesRouters.get('/upcoming', upcoming)
moviesRouters.post('/', createMovies)
moviesRouters.patch('/:id', updateMovies)
moviesRouters.delete('/:id', deleteMovies)
module.exports = moviesRouters