const express = require('express')
const {register, login, findUser, changeSelect} = require('../controllers/userControllers')
const userRoutes = express.Router()

userRoutes.post('/register', register)
userRoutes.post('/login', login)
userRoutes.post('/find', findUser)
userRoutes.post('/change/:id', changeSelect)

module.exports = userRoutes