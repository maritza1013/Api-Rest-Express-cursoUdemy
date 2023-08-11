const usuarios = require('./routes/usuarios');
const cursos = require('./routes/cursos');
const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/demo', {useNewUrlParser:true, useUnifiedTopology:true})
    .then(() => console.log('conectado a mongodb...'))
    .catch(()=> console.log('no se pudo conectar con mongodb...', err))

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/usuarios', usuarios);
app.use('/api/cursos', cursos);


const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log('Api RestFul ok y ejecutandose...')
})