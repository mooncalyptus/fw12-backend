const { readAllUsers, createUser, updateUser, deleteUsers, readUser } = require('../controllers/users.controller')
const uploadMiddleware = require('../middleware/upload.middleware')
const usersRouters = require('express').Router()
const authMiddleware = require('../middleware/auth.middleware')

usersRouters.get('/', authMiddleware, readAllUsers) //menerima data dalam bentuk query string
usersRouters.get('/:id', readUser) //menerima data dalam bentuk query string
usersRouters.post('/', uploadMiddleware, createUser) //menerima data dalam bentuk query string dan body
usersRouters.patch('/:id', uploadMiddleware, updateUser) //menerima data dalam bentuk query string dan juga body
usersRouters.delete('/:id', deleteUsers) //menerima data dalam bentuk query string
module.exports = usersRouters

