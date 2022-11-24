const { readAllUsers, createUser, updateUser, deleteUsers, readUser } = require('../controllers/users.controller')

const usersRouters = require('express').Router()

usersRouters.get('/', readAllUsers) //menerima data dalam bentuk query string
usersRouters.get('/:id', readUser) //menerima data dalam bentuk query string
usersRouters.post('/', createUser) //menerima data dalam bentuk query string dan body
usersRouters.patch('/:id', updateUser) //menerima data dalam bentuk query string dan juga body
usersRouters.delete('/:id', deleteUsers) //menerima data dalam bentuk query string
module.exports = usersRouters

