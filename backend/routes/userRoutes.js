const express = require('express')
const {register, login, findUser} = require('../controllers/userControllers')
const userRoutes = express.Router()

userRoutes.post('/register', register)
userRoutes.post('/login', login)
userRoutes.post('/find', findUser)

module.exports = userRoutes