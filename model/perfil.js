var conexao = require ("../config/conexao")


var PerfilSchema =conexao.Schema({
    perfi:{type:String},
    email:{type:String},
    foto:{type:String},

})

module.exports= conexao.model("Perfil",PerfilSchema)