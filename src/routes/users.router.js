const { readAllUsers, createUser, updateUser, deleteUsers } = require('../controllers/users.controller')

const usersRouters = require('express').Router()

usersRouters.get('/', readAllUsers)
usersRouters.post('/', createUser)
usersRouters.patch('/', updateUser)
usersRouters.delete('/',deleteUsers)
module.exports = usersRouters