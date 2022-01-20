const Usuario = require("../models/usuarioM");
const Hospitales = require('../models/hospitalM');
const Medicos = require('../models/medicosM');

const getTodo = async (req,res) =>{
    const argumento = req.params.argumento;
    const expReg = RegExp(argumento,'i');
    const [usuarios, medicos,hospitales] = await Promise.all([
         Usuario.find({nombre:expReg}),
         Medicos.find({nombre:expReg,estado:'activo'}),
         Hospitales.find({nombre:expReg}),
    ])
    try {
        res.json({
            ok:true,
            msg:"Todo Ok",
            usuarios,
            medicos,
            hospitales
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:"error inesperado"
        })
    }
}
const getCollection = async (req,res) =>{
    const argumento = req.params.argumento;
    const tabla = req.params.tabla;
    const expReg = RegExp(argumento,'i');
    let data = [];
   switch (tabla) {
        case 'usuarios':
           data = await Usuario.find({nombre:expReg});
           break;
        case 'medicos':
           data = await Medicos.find({nombre:expReg})
                               .populate('usuario','nombre img')
                               .populate('hospital','nombre');
        break;
        case 'hospitales':
           data = await Hospitales.find({nombre:expReg})
                                  .populate('usuario','nombre');
            break;
       default:
           return res.status(400).json({
               ok:false,
               msg:"la tabla debe ser medicos/hospitales/usuarios"
           });
   }
   
    try {
        res.json({
            ok:true,
            Resultados:data
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:"error inesperado"
        })
    }
}

module.exports={getTodo,getCollection}