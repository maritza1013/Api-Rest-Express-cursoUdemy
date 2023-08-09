const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/demo', {useNewUrlParser:true, useUnifiedTopology:true})
    .then(() => console.log('conectado a mongodb...'))
    .catch(()=> console.log('no se pudo conectar con mongodb...', err))

    const cursoSchema = new mongoose.Schema({
        nombre      : String,
        autor       : String,
        etiquetas   : [String],
        fecha       : { type:Date, default:Date.now},
        publicado   : Boolean
    });

    const Curso = mongoose.model('curso', cursoSchema);

    async function crearCurso(){
        const curso = new Curso ({
            nombre:'Angular para principiantes',
            autor:'maria ruiz',
            etiquetas:['desarrollo web','front end'],
            publicado:true
        })
        const resultado = await curso.save()
        console.log(resultado)
    };
    // crearCurso();

    async function listarCursos(){
        const cursos = await Curso
        .find({publicado:true})
        .limit(10)
        .sort({autor:1})
        .select({nombre:1, etiquetas:1})
        console.log(cursos);
    }
    listarCursos();