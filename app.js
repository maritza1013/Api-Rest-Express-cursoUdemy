const express = require('express');
const config = require('config');
const Joi = require('joi');
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))

console.log('Aplicacion : ' + config.get('nombre'));
console.log('BD server : ' + config.get('configDB.host'));


const usuarios = [
    {id:1, nombre:'fernando'},
    {id:2, nombre:'lucas'},
    {id:3, nombre:'aleja' }
]


app.get('/', (req, res) =>{
    res.send('Hola desde express...')
})


app.get('/api/usuarios', (req, res) =>{
    res.send([usuarios])
})

// app.get('/api/usuarios/:id', (req, res) =>{
//     res.send(req.params.id)
// })

app.get('/api/usuarios/:id', (req, res) =>{
    let usuario = existeUsuario(req.params.id);
    if(!usuario) res.status(404).send('no fue encontrado el usuario');
    res.send(usuario)
})


app.get('/api/usuarios/:years/:month', (req, res) =>{
    res.send(req.params)
})

app.post('/api/usuarios', (req, res) =>{

 const {error, value} = validarUsuario(req.body.nombre )
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

app.put('/api/usuarios/:id', (req, res) =>{
    let usuario = existeUsuario(req.params.id);
    if(!usuario){ 
     res.status(404).send('no fue encontrado el usuario')
     return;
    };
    
    const {error, value} = validarUsuario(req.body.nombre );
    if(error){
    const mensaje = error.details[0].message;
    res.status(400).send(mensaje)
    return;
    }

    usuario.nombre = value.nombre;
    res.send(usuario);
})

})

app.delete('/api/usuarios/:id', (req, res) =>{
    let usuario = existeUsuario(req.params.id);
    if(!usuario){ 
     res.status(404).send('no fue encontrado el usuario')
     return;
    };

    const index = usuarios.indexOf(usuario);
    usuarios.splice(index, 1)

    res.send(usuarios)
});    

app.listen(3000, ()=>{
    console.log('Escuchando en el puerto 3000')
})

function existeUsuario(id){
    return( usuarios.find(u => u.id === parseInt(id)));
}

function validarUsuario(nom){
    const schema = Joi.object({
        nombre: Joi.string().min(3).required(),});
        return(schema.validate({ nombre:nom}));
}