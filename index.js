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

app.get('/site', function(req, res){
        res.render('mean.ejs', {})
})
app.get('/dentro', function(req, res){
    res.render('index.ejs', {})
})
app.get('/Perfil', function(req, res){
    res.render('perfil.ejs', {})
})
app.get('/agendamento', function(req, res){
    res.render('estatico.ejs', {})
})

app.get('/', function(req, res){
    Usuario.find({}).exec(function(err,docs){
        res.render('index.ejs', {Usuarios:docs})
    })
})
app.get("/del/:id", function(req,res){
    Usuario.findByIdAndDelete(req.params.id,function(err){
        if(err){
            console.log(err)
        }else{
            res.redirect("/")
        }
    })
   
})
app.get("/edit/:id",function(req,res){
    Usuario.findById(req.params.id, function(err, docs){
        if(err){
           console.log(err)
        }else{
            res.render("edita.ejs",{Usuario:docs})
        }
        
    })
    
})
app.post("/edit/:id",function(req,res){
    Usuario.findByIdAndUpdate(req.params.id, 
        {nome:req.body.txtNome,
             email:req.body.txtEmail, 
             senha:req.body.txtSenha,
              foto:req.body.txtFoto, 
              telefone:req.body.txtTelefone
            }, function(err,docs){
                res.redirect("/")
            }
              )
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
app.post('/perfil', function(req,res){
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
app.post('/login', function(req,res){
    var usuario = new Usuario({
        email: req.body.txtEmail,
        senha: req.body.txtSenha,
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
app.get('/login', function(req,res){
    res.render("login.ejs")
})
app.get('/agendamento', function(req,res){
    res.render("agendamento.ejs")
})
app.listen(3000, function() {
    console.log("Console iniciado na porta 000")
})


