const port = 4000;
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const wordsRouter = require('./routes/wordsRouter');
const app = express()
const cors = require('cors')

app.use(cors({
    origin: 'http://localhost:5173'
}))
app.use(cors())
app.use(express.json())
app.use('/api/user', userRoutes)
app.use('/api/words', wordsRouter)

app.listen(port, ()=>console.log(`Server running at ${port}`))//npm start