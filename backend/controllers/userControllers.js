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
        let data;
         userModels.login(primeiro, password).then((t)=>{
           token = t.token
           data=t.dt
           const {password, ...outros} = data
           if(token == null || token == undefined){
            return res.status(404).json('Login not valid')
        }
         res.cookie("accessToken", token, {
            httpOnly: true
        }).status(200).json(outros)  
         }).catch((err)=>{//guarda o token nos cookies e retorna a data
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

async function changeSelect(req, res){
  const learningLanguage = req.body.learningLanguage
  const {id} = req.params
  try{
    await userModels.changeSelect(learningLanguage, id)
    return res.status(200).json()
  }catch(err){
    return res.status(404).json(err)
  }
}


module.exports = {register, login, findUser, changeSelect}