const express = require ('express')
const app = express()
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var path = require('path')
var Usuario = require("./model/usuario")

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")))


app.get('/', function(req, res){
    res.render("index.ejs",{})
})

app.get('/usuarios', function(req, res){
    res.render("usuarios.ejs",{usuarios:[
        {nome:"Diego", email:"vihalavres@gmail.com"}, 
        {nome:"Diego", email:"Ana@gmail.com"}
    ]})
})
// O post é para ter resposta. para formularios etc //
app.post('/cadastro', function(req,res){
    var usuario = new Usuario({
        nome: req.body.txtNome,
        email: req.body.txtEmail,
        senha: req.body.txtSenha,
        foto: req.body.txtFoto,
        telefone: req.body.txtTelefone,
    })
      usuario.save(function(err){
          if(err){
             console.log(err)
          }else{
              res.redirect("/")
          }

      })

})
app.get('/cadastro', function(req,res){
       res.render("cadastro.ejs")
})

app.listen(3000, function() {
    console.log("Console iniciado na porta 3000")
})