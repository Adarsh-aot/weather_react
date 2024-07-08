const express = require('express')
const app = express()
const router = express.Router()
const registration = require('../helper/registration')



router.post('/',registration.login)

module.exports = router