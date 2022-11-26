const {readAllMovies, createMovies, updateMovies, deleteMovies} = require('../controllers/movies.controller')

const moviesRouters = require('express').Router()

moviesRouters.get('/', readAllMovies)
moviesRouters.post('/', createMovies)
moviesRouters.patch('/:id', updateMovies)
moviesRouters.delete('/:id', deleteMovies)
module.exports = moviesRouters