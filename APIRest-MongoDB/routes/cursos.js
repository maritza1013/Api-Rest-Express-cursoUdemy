const express = require('express');
const ruta = express.Router();

ruta.get('/', (req, res) =>{
    res.json('listo el get de cursos.')
})

module.exports = ruta;