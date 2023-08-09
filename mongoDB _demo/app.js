const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/demo', {useNewUrlParser:true, useUnifiedTopology:true})
    .then(() => console.log('conectado a mongodb...'))
    .catch(()=> console.log('no se pudo conectar con mongodb...', err))