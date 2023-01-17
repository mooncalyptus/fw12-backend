const usersRouters = require('express').Router()
const { getAllUsers, createUsers, updateUsers, deleteUsers} = require('../controllers/users.controller')
// const uploadMiddleware = require('../middleware/upload.middleware')
const authMiddleware = require('../middleware/auth.middleware')

usersRouters.get('/', getAllUsers) //menerima data dalam bentuk query string
// usersRouters.get('/:id', readUser) //menerima data dalam bentuk query string
// usersRouters.post('/', createUsers) //menerima data dalam bentuk query string dan body
usersRouters.patch('/:id', updateUsers) //menerima data dalam bentuk query string dan juga body
usersRouters.delete('/:id', deleteUsers) //menerima data dalam bentuk query string
module.exports = usersRouters

