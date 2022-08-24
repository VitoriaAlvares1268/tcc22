const express = require ('express')
const app = express()
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var path = require('path')
var Usuario = require("./model/usuario")
var Agenda = require("./model/agendamento")
var upload = require("./config/configMulter");
const passport = require("./config/passport");
var session = require("express-session");
var autenticacao = require("./config/autenticacao");
app.use(
  session({
    secret: "5info",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.authenticate("session"));

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
    Agenda.find({}).exec(function(err,docs){
        res.render('estatico.ejs', {Agenda:docs})
    })
})
app.get('/adm', function(req, res){
    Agenda.find({}).exec(function(err,docs){
        res.render('adm.ejs', {Agenda:docs})
    })
})

app.get('/', function(req, res){
    Usuario.find({}).exec(function(err,docs){
        res.render('index.ejs', {Usuarios:docs})
    })
})
app.get('/adic', function(req, res){
    Usuario.find({}).exec(function(err,docs){
        res.render('index1.ejs', {Usuarios:docs})
    })
})
app.get('/reserva', function(req, res){
    Agenda.find({}).exec(function(err,docs){
        res.render('index2.ejs', {Agenda:docs})
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
app.get("/del/:id", function(req,res){
    Agenda.findByIdAndDelete(req.params.email,function(err){
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


app.post('/agendamentoO', function(req,res){
    var agenda = new Agenda({
        email: req.body.txtEmail,
        data: req.body.txtData,
        horario: req.body.txtHorario,

    })
      agenda.save(function(err){
          if(err){
             console.log(err)
          }else{
              res.redirect("/")
          }

      })

})
app.post('/adm', function(req,res){
    var agenda = new Agenda({
        email: req.body.txtEmail,
        data: req.body.txtData,
        horario: req.body.txtHorario,

    })
      agenda.save(function(err){
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
app.get('/agendamentoO', function(req,res){
   
    res.render("inscreva.ejs")
})
app.get('/login', function(req,res){
    res.render("login.ejs")
})
app.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/dentro",
      failureRedirect: "/login",
    })
  );
app.get('/agendamento', function(req,res){
    res.render("agendamento.ejs")
})
app.listen(3000, function() {
    console.log("Console iniciado na porta 000")
})

app.get('/PerfilUsuario', function(req,res){
    res.render("charts.ejs")
})
