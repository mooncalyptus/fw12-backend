const profile = require('express').Router()
const authMiddleware = require('../middleware/auth.middleware')
const {readProfile} = require("../controllers/profile.controller")

profile.get('/', authMiddleware, readProfile)

module.exports = profile