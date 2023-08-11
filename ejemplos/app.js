const express = require('express');
const usuarios = require('./routes/usuarios');
const config = require('config');
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/api/usuarios', usuarios)

console.log('Aplicacion : ' + config.get('nombre'));
console.log('BD server : ' + config.get('configDB.host'));

app.get('/', (req, res) =>{
    res.send('Hola desde express...')
})

app.listen(3000, ()=>{
    console.log('Escuchando en el puerto 3000')
})

