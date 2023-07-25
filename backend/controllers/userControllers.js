const userModels = require('../models/userModels')
const jwt = require('jsonwebtoken')
require('dotenv').config()

async function register(req, res){
  const data  = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    mainLanguage: req.body.mainLanguage,
    learningLanguage: req.body.learningLanguage
  }
  try{
    await userModels.register(data)
    return res.status(200).json("User created")
  }catch(err){
    return res.status(404).json(err)
  }
}

    function login(req, res){
    const primeiro = req.body.email || req.body.username;//(req.body.email == null ? req.body.username : req.body.email);
    const password = req.body.password;
        let token;
         userModels.login(primeiro, password).then((t)=>{
           token = t
           if(token == null || token == undefined){
            return res.status(404).json('Login not valid')
        }

         res.cookie("accessToken", token, {
            httpOnly: true
        }).status(200).json(token)  
         }).catch((err)=>{
          res.status(400).json(err.message)}
          )

          
}


module.exports = {register, login}