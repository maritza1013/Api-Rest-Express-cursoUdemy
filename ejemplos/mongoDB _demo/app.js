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
        // .find({publicado:true})
        // .find({precio:{$gte:10, $lte:30}})
        // .find({precio: {$in:[10,15,25]}})
        .find({autor:/^mar/})
        .limit(10)
        .sort({autor:1})
        .select({nombre:1, etiquetas:1})
        console.log(cursos)
    }
    listarCursos();

    async function actualizarCurso(id){
        // const curso = await Curso.findById(id)
        // if(!curso){
        //     console.log('no existe el curso')
        //     return;
        // }
        // curso.publicado = false;
        // curso.autor = 'Maritza Rivera';

        // const resultado = await curso.save()
        // console.log(resultado)

        const resultado = await Curso.updateOne({ _id:id},{
            $set:{
                autor: 'maritza',
                publicado: true
            }
            
        })
        console.log(resultado)
    }
    actualizarCurso("64d4042ce9f8b4f5a1a0bf90")