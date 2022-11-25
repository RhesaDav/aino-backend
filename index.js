const express = require('express')
const cors = require('cors')
const db = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const app = express()
require('dotenv').config()

db()

app.use(express.json({extended: false}))
app.use(cors())

app.use('/api/user', userRoutes)

app.listen(process.env.PORT, () => {
    console.log(`running at http://localhost:8080`)
})

app.get('/', (req,res) => {
    res.send('oke')
})