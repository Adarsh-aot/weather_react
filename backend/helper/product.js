let { data } = require('../constant/array')

const getdata = (req , res) => {
    res.send(data)
}


const getdatabyid = (req , res) => {
    const id = req.params.id
    const result = data.find((item) => item.id == id)
    res.json(result)
}

const postdata = (req , res) => {
    const newdata = {...req.body , data : req.decode.id} 
    data.push(newdata)
    res.json(newdata)
}


const delete_data = (req , res) => {
    const id = req.params.id
    data = data.filter((item) => item.id != id)
    res.json(data)
}


const myproduct = (req , res) => {
    const id = req.decode.id
    const todo = data.filter((item) => item.data == id)
    console.log(todo)
    res.json(todo)

}
module.exports = {
    getdata , 
    getdatabyid ,
    postdata ,
    delete_data ,
    myproduct
}