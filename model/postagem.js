var conexao = require("../config/conexao");


var PostagemSchema =conexao.Schema({
  titulo:{type:String},
  descricao:{type:String},
  foto:{type:String},
  

})

module.exports = conexao.model("Postagem", PostagemSchema);