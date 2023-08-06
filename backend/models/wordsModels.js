const db = require('../models/connection')

async function getWords(idUser, mainLanguage){
  const q = "SELECT * FROM words WHERE idUser = ? AND mainLanguageUsers = ?"
  const [data] = await db.execute(q, [idUser, mainLanguage])
  return data
}

async function postWords(date, idUser, word, translation, learningLanguage, mainLanguage){
    const q = "INSERT INTO words (createdAt, idUser, word, translation, learningLanguage, mainLanguageUsers) VALUES (?, ?, ?, ?, ?, ?)"
    const data = await db.execute(q, [date, idUser, word, translation, learningLanguage, mainLanguage])
    return data
}

async function editWords(word, translation, idPost){
  const q = "UPDATE words SET word = ?, translation = ? WHERE id = ?"
  const data = await db.execute(q, [word, translation, idPost])
  return data
}

async function deleteWords(postId){
  const q = "DELETE FROM words WHERE id = ?";
  const data = await db.execute(q, [postId])
  return data
}

module.exports = {getWords, postWords, editWords, deleteWords}