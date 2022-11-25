const express = require('express')
const { register, listUser, login } = require('../controllers/user')
const userRoutes = express.Router()

userRoutes.post('/register', register)
userRoutes.post('/login', login)
userRoutes.get('/', listUser)

module.exports = userRoutes