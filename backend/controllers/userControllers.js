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
    learningLanguage: req.body.learningLanguage,
    profilePic: req.body.profilePic
  }
  try{
    const a = await userModels.register(data)
    if(!a) return res.status(404).json('Username or email already used')
    return res.status(200).json("User created")
    
  }catch(err){
    return res.status(404).json(err.message)
  }
}

    function login(req, res){
    const primeiro = req.body.email//(req.body.email == null ? req.body.username : req.body.email);
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
          res.status(404).json(err.message)}
          )        
}//verificar o porque de nao funcionar o login

async function findUser(req, res){
  const {email} = req.body
  try{
  const data = await userModels.findUser(email)
  console.log(data)
  if(!data){
    return res.status(404).json("User not found")
  }
  return res.status(200).json(data)
}catch(err){
  return res.status(404).json(err)
}
}


module.exports = {register, login, findUser}