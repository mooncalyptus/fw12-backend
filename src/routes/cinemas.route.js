const {readAllCinemas, createCinemas, updateCinemas, deleteCinemas} = require('../controllers/cinemas.controller')

const cinemasRouters = require('express').Router()

cinemasRouters.get('/', readAllCinemas)
cinemasRouters.post('/', createCinemas)
cinemasRouters.patch('/:id', updateCinemas)
cinemasRouters.delete('/:id', deleteCinemas)
module.exports = cinemasRouters
