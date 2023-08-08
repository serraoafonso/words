const port = 4000;
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const wordsRouter = require('./routes/wordsRouter');
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const multer = require('multer')

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true // Allow cookies and other credentials to be sent
};

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Credentials", true)//preciso fazer isto e na request dar o credentials include
    next()
})
app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser())//preciso fazer isto para conseguir buscar os cookies com req.cookie

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, '../frontend/public/uploads')
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({storage: storage})
app.use('/uploads', express.static('../frontend/public/uploads'));
app.post('/api/upload', upload.single('file'), (req, res)=>{
    const file = req.file;
    res.status(200).json(file.filename)
})
app.use('/api/user', userRoutes)
app.use('/api/words', wordsRouter)

app.listen(port, ()=>console.log(`Server running at ${port}`))//npm start