const {readAllCinemas, createCinemas, updateCinemas, deleteCinemas, selectCinemas} = require('../controllers/cinemas.controller')

const cinemasRouters = require('express').Router()

cinemasRouters.get('/', readAllCinemas)
cinemasRouters.get('/:id/selectCinemas', selectCinemas)
cinemasRouters.post('/', createCinemas)
cinemasRouters.patch('/:id', updateCinemas)
cinemasRouters.delete('/:id', deleteCinemas)
module.exports = cinemasRouters
