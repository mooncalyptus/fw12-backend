const {readAllMovieGenre, createMovieGenre, updateMovieGenre, deleteMovieGenre} = require('../controllers/movieGenre.controller')
const movieGenreRoutes = require('express').Router()

movieGenreRoutes.get('/', readAllMovieGenre)
movieGenreRoutes.post('/', createMovieGenre)
movieGenreRoutes.patch('/:id', updateMovieGenre)
movieGenreRoutes.delete('/:id', deleteMovieGenre)
module.exports = movieGenreRoutes