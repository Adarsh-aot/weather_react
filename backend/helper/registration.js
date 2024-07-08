const { todo } = require('../constant/array')
const jwt = require('jsonwebtoken');


const login = (req , res) => {
    const {email , password} = req.body
    const index = todo.findIndex((item) => item.email == email && item.password == password)
    if( index == -1 ){
        res.json({status : 'failed'})
    }else{
        const id = todo[index].id
        var token = jwt.sign({ id  , email}, 'shhhhh');
        res.json({token})
    }
}




module.exports = {
    login
}