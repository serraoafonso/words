const express = require('express')
const { getWords, postWords, editWords, deleteWords } = require('../controllers/wordsControllers')
const wordsRouter = express.Router()

wordsRouter.post('/get/:userId', getWords)
wordsRouter.post('/post/:userId', postWords)
wordsRouter.put('/:postId', editWords)
wordsRouter.delete('/:postId', deleteWords)

module.exports = wordsRouter