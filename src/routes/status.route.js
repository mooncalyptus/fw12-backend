const {readAllStatus, createStatus, updateStatus, deleteStatus} = require('../controllers/status.controller')

const statusRouters = require('express').Router()

statusRouters.get('/', readAllStatus)
statusRouters.post('/', createStatus)
statusRouters.patch('/:id', updateStatus)
statusRouters.delete('/:id', deleteStatus)
module.exports = statusRouters