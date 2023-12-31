const express = require('express')
const {register, login, findUser, changeSelect, changeAll, getUser, getWords} = require('../controllers/userControllers')
const userRoutes = express.Router()

userRoutes.post('/register', register)
userRoutes.post('/login', login)
userRoutes.post('/find', findUser)
userRoutes.post('/change/:id', changeSelect)
userRoutes.post('/changeAll/:id', changeAll)
userRoutes.get('/user/:id', getUser)
userRoutes.get('/words/:id', getWords)


module.exports = userRoutes