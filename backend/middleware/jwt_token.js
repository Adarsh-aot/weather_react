const jwt = require('jsonwebtoken')
// const { secretkey, data } = require('../helper/helper')



const jwt_token_validatotion = (req, res, next) => {
    console.log(req.headers.authorization)
    try {   
        const decode = jwt.verify(req.headers.authorization, 'shhhhh');
        console.log(decode);
        req.decode = decode
        next()
    } catch (error) {
        // Handle invalid token error
        console.log(error)
        res.status(401).json({ message: 'invalid token' });
        
        
    }
}

module.exports = {
    jwt_token_validatotion
}