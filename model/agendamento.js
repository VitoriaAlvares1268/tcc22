var conexao = require ("../config/conexao")


var AgendaSchema =conexao.Schema({
    data:{type:String},
    horario:{type:String},
   
})
const data =new Date()
const dia = String(data.getDate()).padStart(2, '0') //
const mes = String(mes.getMonth() + 1 ).padStart(2, '0')//
 const datAtual = 

module.exports= conexao.model("Agendamento",AgendaSchema)