var conexao = require ("../config/conexao")


var LoginSchema =conexao.Schema({
    email:{type:String},
    senha:{type:String},
    foto:{type:String},
})

module.exports= conexao.model("Login",LoginSchema)