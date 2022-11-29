const {readAllSubscribers, createSubscribers, updateSubscribers, deleteSubscribers} = require('../controllers/subscribers.controller')

const subscribersRouters = require('express').Router()

subscribersRouters.get('/', readAllSubscribers)
subscribersRouters.post('/', createSubscribers)
subscribersRouters.patch('/:id', updateSubscribers)
subscribersRouters.delete('/:id', deleteSubscribers)
module.exports = subscribersRouters