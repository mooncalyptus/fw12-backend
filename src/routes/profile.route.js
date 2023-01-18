const profile = require('express').Router()
const authMiddleware = require('../middleware/auth.middleware')
const {readProfile, updateProfile} = require("../controllers/profile.controller")
const {uploadMiddleware} = require('../middleware/upload.middleware')

profile.get('/', authMiddleware, readProfile)
profile.patch('/', authMiddleware, uploadMiddleware, updateProfile)

module.exports = profile