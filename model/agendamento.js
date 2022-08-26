var conexao = require ("../config/conexao")

var AgendaSchema =conexao.Schema({
    email:{type:String},
    data:{type:String},
    horario:{type:String},
   
})



module.exports= conexao.model("Agendamento",AgendaSchema)