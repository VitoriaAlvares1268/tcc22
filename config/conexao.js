// Fazer a conexão com banco de dados//
const mongoose = require('mongoose')
const uri = "mongodb://localhost:27017/apnp" // colocar link para o mongo
mongoose.connect(uri)


module.exports = mongoose