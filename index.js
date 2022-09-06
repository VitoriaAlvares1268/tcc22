const express = require ('express')
const app = express()
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var path = require('path')
var Usuario = require("./model/usuario")
var Perfil = require("./model/perfil")
var Agenda = require("./model/agendamento")
var Postagem = require("./model/postagem");
var upload = require("./config/configMulter");
const passport = require("./config/passport");
var session = require("express-session");
var autenticacao = require("./config/autenticacao");
const { title } = require('process')
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

//Abre tela de login
app.get('/login', function(req,res){
    res.render("login.ejs")
})

//Loga
app.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/dentro",
      failureRedirect: "/login",
    })
  );

  //Abre cadastro
app.get('/cadastro', function(req,res){
    res.render("cadastro.ejs")
})
//cadastra
app.post('/cadastro', function(req,res){
    var usuario = new Usuario({
        nome: req.body.txtNome,
        email: req.body.txtEmail,
        senha: req.body.txtSenha,
    })
      usuario.save(function(err){
          if(err){
             console.log(err)
          }else{
              res.redirect("/login")
          }

      })
})

//usando
app.get('/dentro', function(req, res){
    Postagem.find({}).exec(function(err,docs){
        res.render('index.ejs', {Postagens:docs})
    })
})
//pesquisar
app.post("/dentro",function(req,res){
    Postagem.find({titulo: new RegExp(req.body.txtPesquisa,'g')}).exec(function(err,docs){
        res.render('index.ejs',{Postagens:docs})

    })
})
app.post("/agendamento",function(req,res){
    Agenda.find({data: new RegExp(req.body.txtPesquisa,'g')}).exec(function(err,docs){
        res.render('estatico.ejs',{Agenda:docs})

    })
})

app.get('/agendamento/:id', function(req,res){  
     Postagem.findById(req.params.id).then(function(postagem){
        res.render("inscreva.ejs", {Vaga:postagem})
     })
    
})
app.post('/agendamento/:id', function(req,res){
    var agenda = new Agenda({
        email: req.user.email,
        data: req.body.txtData,
        vaga: req.body.txtVaga,
        horario: req.body.txtHorario,
    })
      agenda.save(function(err){
          if(err){
             console.log(err)
          }else{
              res.redirect("/agendamento")
          }
      })
})
app.get('/agendamento', function(req, res){
    Agenda.find({email:req.user.email}).exec(function(err,docs){
        res.render('estatico.ejs', {Agenda:docs})
    })
})


//usando
app.get('/PerfilUsuario', function(req,res){
    res.render("charts.ejs")

})
app.post('/PerfilUsuario',upload.single("txtFoto"),function(req,res){
    var perfil = new Perfil({
        perfi: req.file.filename,
        email: req.user.email,
        foto: req.file.filename,
    })
      perfil.save(function(err){
          if(err){
             console.log(err)
          }else{
              res.redirect("/PerfilUsuario")
          }
      })
})

app.get("/reserva/del/:id", function(req,res){
    Agenda.findByIdAndDelete(req.params.id,function(err){
        if(err){
            console.log(err)
        }else{
            res.redirect("/agendamento")
        }
    })
   
})

//AQUI ACABOU A PARTE DO USUARIO


//INICIO DO ADMIN
app.get('/adm/reserva', function(req, res){
    Agenda.find({}).exec(function(err,docs){
        res.render('adm.ejs', {Agenda:docs})
    })
})

app.get("/adm/reserva/del/:id", function(req,res){
    Agenda.findByIdAndDelete(req.params.id,function(err){
        if(err){
            console.log(err)
        }else{
            res.redirect("/adm/reserva")
        }
    })
   
})

app.get('/adm/lancarvaga', function(req, res){
    
    res.render('vagas.ejs')

})

//usando
app.post('/adm/lancarvaga',upload.single("txtFoto"),function(req,res){
    var postagem = new Postagem({
        titulo: req.body.txtTitulo,
        foto: req.file.filename,
        descricao: req.body.txtDescricao,

    })
      postagem.save(function(err){
          if(err){
            res.send("Aconteceu o seguinte erro: " + err);
          }else{
              res.redirect("/adm/vagas")
          }

      })

})
app.get('/adm/vagas', function(req, res){
    Postagem.find({}).exec(function(err,docs){
        res.render('admvagas.ejs', {Postagens:docs})
    })
})

app.get("/adm/vagas/del/:id", function(req,res){
    Postagem.findByIdAndDelete(req.params.id,function(err){
        if(err){
            console.log(err)
        }else{
            res.redirect("/adm/vagas")
        }
    })
   
})

app.get('/', function(req, res){
        res.render('mean.ejs', {})
})

app.listen(3000, function() {
    console.log("Console iniciado na porta 000")
})