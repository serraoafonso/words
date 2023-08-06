const wordsModels = require('../models/wordsModels')
const moment = require('moment')

async function getWords(req, res){
  const {userId} = req.params;
  const {mainLanguage} = req.body;
  try{
    const data = await wordsModels.getWords(userId, mainLanguage)
    return res.status(200).json(data)
  }catch(err){
    console.log(err)
  }
}

async function postWords(req, res){
  const {learningLanguage, mainLanguage,word, translation} = req.body;
  const {userId} = req.params;
  const date = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
  try{
    await wordsModels.postWords(date, userId, word, translation, learningLanguage, mainLanguage)
    return res.status(200).json('Post created')
  }catch(err){
    return res.status(404).json(err)
  }
}

async function editWords(req, res){
  const {word, translation} = req.body
  const {postId} = req.params;
  try{
    await wordsModels.editWords(word, translation, postId)
    return res.status(200).json('Changes saved')
  }catch(err){
    return res.status(404).json(err)
  }
}

async function deleteWords(req, res){
  const {postId} = req.params;
  try{
    await wordsModels.deleteWords(postId)
    return res.status(200).json()
  }catch(err){  
    return res.status(404).json()
  }
}

module.exports = {getWords, postWords, editWords, deleteWords}