var conexao = require ("../config/conexao")


var PerfilSchema =conexao.Schema({
    nome:{type:String},
    email:{type:String},
    foto:{type:String},

})

module.exports= conexao.model("Perfil",PerfilSchema)