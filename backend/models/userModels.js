const db = require('./connection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

function register(data){

  const {name, email, username, password, mainLanguage, learningLanguage} = data

  const salt = bcrypt.genSaltSync(10)
  const hashed_password = bcrypt.hashSync(password, salt)

  const q = 'INSERT INTO users (name, email, password, username, mainLanguage, learningLanguage) VALUES (?,?,?,?,?,?)'

  db.query(q, [name, email,hashed_password, username, mainLanguage, learningLanguage])

}

async function login(primeiro, password) {
  try {
    const q = "SELECT * FROM users WHERE username = ? OR email = ?";
    const data = await new Promise((resolve, reject) => {
      db.query(q, [primeiro, primeiro], (err, data) => {
        if (err) {
          reject(new Error("Error"));
        } else {
          resolve(data);
        }
      });
    });

    if (data.length <= 0) {
      throw new Error("Wrong login");
    }

    const checkPassword = await bcrypt.compare(password, data[0]?.password);
    if (!checkPassword) {
      throw new Error("Wrong password");
    } else {
      const { password, ...outros } = data[0];
      const token = jwt.sign(outros, process.env.ACCESS_TOKEN);
      return token;
    }
  } catch (err) {
    throw err;
  }
}


module.exports = {register, login}