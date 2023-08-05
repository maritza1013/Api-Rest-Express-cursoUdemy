const express = require('express');
const Joi = require('joi');
const app = express();


app.use(express.json())


const usuarios = [
    {id:1, nombre:'fernando'},
    {id:2, nombre:'lucas'},
    {id:3, nombre:'aleja' }
]


app.get('/', (req, res) =>{
    res.send('Hola desde express...')
})


app.get('/api/usuarios', (req, res) =>{
    res.send(['juan', 'kevin','manuela'])
})

// app.get('/api/usuarios/:id', (req, res) =>{
//     res.send(req.params.id)
// })

app.get('/api/usuarios/:id', (req, res) =>{
    let usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if(!usuario) res.status(404).send('no fue encontrado el usuario');
    res.send(usuario)
})


app.get('/api/usuarios/:years/:month', (req, res) =>{
    res.send(req.params)
})

app.post('/api/usuarios', (req, res) =>{

const schema = Joi.object({
nombre: Joi.string().min(3).required(),});

 const {error, value} = schema.validate({ nombre:req.body.nombre });
if(!error){
    const usuario = {
    id :usuarios.length +1,
    nombre: value.nombre
 }
    usuarios.push(usuario)
    res.send(usuario)
} else{
    const mensaje = error.details[0].message;
    res.status(400).send(mensaje)
}

// if(!req.body.nombre || req.body.nombre.length <= 2){
//      res.status(400).send('Debe ingresar un nombre, que tenga minimo 3 letras')
//      return;
//     }

})

app.listen(3000, ()=>{
    console.log('Escuchando en el puerto 3000')
})