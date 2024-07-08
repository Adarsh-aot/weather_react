const express = require('express')
const app = express()
const cors = require('cors')
const port = 5000
const data = require('./constant/array')
var jwt = require('jsonwebtoken');


app.use(cors())

app.use(express.json()) 




app.use(express.urlencoded({ extended: true }))


app.use('/registration', require('./routes/registration_route'))
app.use('/product', require('./routes/product_route'))


app.listen(port, () => {
    console.log(`started running ${port}`)
})