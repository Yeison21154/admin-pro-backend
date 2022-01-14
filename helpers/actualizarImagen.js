const Usuarios = require('../models/usuarioM');
const Hospitales = require('../models/hospitalM');
const Medicos = require('../models/medicosM');
const fs = require('fs');

const deleteImg= (path) =>{
    if(fs.existsSync(path)){
        fs.unlinkSync(path);
    }
}
const ActualizarImagen = async (tipo,id,nombreArchivo) =>{
    let pathViejo = '';
    switch(tipo){
        case 'medicos':
            const medico = await Medicos.findById(id);
            if(!medico){
                console.log("no es un medico Valido");
                return false;
            }
            pathViejo = `./uploas/medicos/${medico.img}`;
            deleteImg(pathViejo);
            medico.img = nombreArchivo;
            await medico.save();
            console.log("ok");
            return true
        break;
        case 'usuarios':
            const usuarios = await Usuarios.findById(id);
            if(!usuarios){
                console.log("no es un usuario Valido")
                return false;
            }
            pathViejo = `./uploas/usuarios/${usuarios.img}`;
            deleteImg(pathViejo);
            usuarios.img = nombreArchivo;
            await usuarios.save();
            return true;
        break
        case 'hospitales':
            const hospitales = await Hospitales.findById(id);
            if(!hospitales){
                console.log("no es un hospitales Valido")
                return false;
            }
            pathViejo = `./uploas/hospitales/${hospitales.img}`;
            deleteImg(pathViejo);
            hospitales.img = nombreArchivo;
            await hospitales.save();
            return true;
        break;
    }
}


module.exports={ActualizarImagen}