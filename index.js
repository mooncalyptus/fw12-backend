const { urlencoded } = require('express')
const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/', require('./src/routes'))
app.get('/', (req,res) => {
    return res.status(200).json({
        success: true,
        message: "Backend is running well"
    })
})

app.listen(8888, ()=> {
    console.log("App running on port 8888");
})