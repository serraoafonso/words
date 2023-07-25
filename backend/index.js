const port = 6000;
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const wordsRouter = require('./routes/wordsRouter');
const app = express()


app.use(express.json())
app.use('/api/user', userRoutes)
app.use('/api/words', wordsRouter)

app.listen(port, ()=>console.log(`Server running at ${port}`))//npm start