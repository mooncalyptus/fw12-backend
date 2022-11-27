const {readAllGenre, createGenre, updateGenre,deleteGenre } = require('../controllers/genre.controller')

const genreRouters = require('express').Router()

genreRouters.get('/', readAllGenre)
genreRouters.post('/', createGenre)
genreRouters.patch('/:id', updateGenre)
genreRouters.delete('/:id', deleteGenre)
module.exports = genreRouters