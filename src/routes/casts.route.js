const {readAllCasts, createCasts, updateCasts,deleteCasts } = require('../controllers/casts.controller')

const castsRouters = require('express').Router()

castsRouters.get('/', readAllCasts)
castsRouters.post('/', createCasts)
castsRouters.patch('/:id', updateCasts)
castsRouters.delete('/:id', deleteCasts)
module.exports = castsRouters