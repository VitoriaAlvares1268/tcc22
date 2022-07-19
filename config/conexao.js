// Fazer a conexão com banco de dados//
const mongoose = require('mongoose')
const uri = "" // colocar link para o mongo
mongoose.connect(uri)


module.exports = mongoose