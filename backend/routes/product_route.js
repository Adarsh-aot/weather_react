const express = require('express')
const app = express()
const router = express.Router()
const product = require('../helper/product')
const { route } = require('./registration_route')
const { jwt_token_validatotion } = require('../middleware/jwt_token')


router.get('/myproduct',jwt_token_validatotion,product.myproduct)
router.get('',product.getdata)
router.get('/:id',product.getdatabyid)
router.post('',jwt_token_validatotion,product.postdata)
router.delete('/:id',product.delete_data)


module.exports = router