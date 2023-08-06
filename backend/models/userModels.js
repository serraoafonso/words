const db = require('./connection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

async function register(data){

  const {name, email, username, password, mainLanguage, learningLanguage, profilePic} = data

  const salt = bcrypt.genSaltSync(10)
  const hashed_password = bcrypt.hashSync(password, salt)

  const q = 'INSERT INTO users (name, email, password, username, mainLanguage, learningLanguage, profilePic) VALUES (?,?,?,?,?,?,?)'

  const a = await db.execute(q, [name, email,hashed_password, username, mainLanguage, learningLanguage, profilePic])
  return a
}

async function login(primeiro, password) {
    try{
    const q = "SELECT * FROM users WHERE username = ? OR email = ?";
    const data = await db.query(q, [primeiro, primeiro])

    if (data.length <= 0) {
      throw new Error("Wrong login");
    }
    console.log(data)
    const checkPassword = await bcrypt.compare(password, data[0][0]?.password);//preciso o await
    if (!checkPassword) {
      throw new Error("Wrong password");
    } else {
      const { password, ...outros } = data[0];
      const token = jwt.sign({id: data[0].id}, process.env.ACCESS_TOKEN);
      const dt = data[0][0]//data certa
      return {token, dt}
    }
  } catch (err) {
    throw err;
  }
}

async function findUser(email){
  const q = "SELECT * FROM users WHERE email = ?"//se quiser usar o await tenho de usar o mysql2/promise
   const [data] = await db.execute(q, [email])
   return data[0]
}


async function changeLearning(learningLanguage, id){
  const q = "UPDATE users SET learningLanguage = ? WHERE id=?";
  const data = await db.execute(q, [learningLanguage, id])
  return data
}

async function changeMain(mainLanguage, id){
  const q = "UPDATE users SET mainLanguage = ? WHERE id=?";
  const data = await db.execute(q, [mainLanguage, id])
  return data
}


async function changeAll(name, username, email, profilePic, id){
  const q = "UPDATE users SET name =  ?, username = ?, email = ?, profilePic = ? WHERE id = ?"
  const data = await db.execute(q, [name, username, email, profilePic, id])
  return data
}


async function getUser(id){
  const q = "SELECT * FROM users WHERE id = ?"
  const [data] = await db.execute(q, [id])
  return data[0]
}
module.exports = {register, login, findUser, changeLearning, changeMain, changeAll, getUser}