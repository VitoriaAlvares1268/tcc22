const express = require ('express')
const app = express()
app.get('/', function(req, res){
    res.send("Ola Vitoria")
})

app.listen(3000, function() {
    console.log("Console iniciado na porta 3000")
})