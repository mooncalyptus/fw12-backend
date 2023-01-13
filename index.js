require('dotenv').config({
  path: '.env',
})
const { urlencoded } = require('express')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'))
app.use(cors())

app.use('/', require('./src/routes'))
app.use("/uploads", express.static("uploads/"));
app.get('/', (req,res) => {
    return res.status(200).json({
        success: true,
        message: "Backend running well"
    })
})

const PORT = process.env.PORT || 8888
app.listen(PORT, ()=> {
    console.log(`App running on port ${PORT}`);
})