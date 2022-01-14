const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const Usuarios = require('../models/usuarioM');
const Hospitales = require('../models/hospitalM');
const Medicos = require('../models/medicosM');
const { ActualizarImagen } = require('../helpers/actualizarImagen');

const fileArchivo = async (req,res) =>{
    const tipo = req.params.tipo;
    const id = req.params.id;
    let ValidaID="";
    const tiposValidos = ['hospitales','medicos','usuarios'];
    if(!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok:false,
            msg:"el tipo no es valido"
        });
    }
    if(tipo === "medicos"){
        ValidaID = await Medicos.findById(id);
    }else if(tipo === "usuarios"){
        ValidaID= await Usuarios.findById(id);
    }else{
        ValidaID = await Hospitales.findById(id);
    }
    if(!ValidaID){
        return res.status(404).json({
            ok:false,
            msg:"El id no existe para medico hospital o usuario"
        })
    }
    if (!req.files || Object.keys(req.files).length === 0) {
        //return res.status(400).send('No files were uploaded.');
        return res.status(400).json({
            ok:false,
            msg:'No files were uploaded.'
        });
        }
    const file = req.files.imagen;
    const cortaNombre = file.name.split('.');
    const extensionA = cortaNombre[cortaNombre.length -1];
    const extensionValida = ['jpg','png','gif','jpeg','PNG'];
    if(!extensionValida.includes(extensionA)){
        return res.status(400).json({
            ok:false,
            msg:'Extension no valida.'
        });
    }
    const nombreArchivo = `${uuidv4()}.${extensionA}`;
    const path = `./uploas/${tipo}/${nombreArchivo}`;
    
    file.mv(path, (err) => {
        if (err){
            console.log(err);
            return res.status(400).json({
                ok:false,
                msg:'Error al subir el archivo.'
            });
        }
        res.json({
            ok:true,
            msg:"Archivo Subido",
            nombreArchivo
        });
    });
    
    ActualizarImagen(tipo,id,nombreArchivo);
    console.log(ActualizarImagen);
}
const retornaImagen = (req,res) =>{
const tipo = req.params.tipo;
const foto = req.params.foto;
const pathImg = path.join(__dirname,`../uploas/${tipo}/${foto}`);
if(fs.existsSync(pathImg)){
    res.sendFile(pathImg);
}else{
    const pathImg = path.join(__dirname,`../uploas/no-img.jpg`);
    res.sendFile(pathImg);
}
}
module.exports ={fileArchivo,retornaImagen}