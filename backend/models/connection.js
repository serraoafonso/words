const mysql = require('mysql2/promise')
const dotenv = require('dotenv')
dotenv.config()

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'palavras'
})

module.exports = connection