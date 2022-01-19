const Medicos = require('../models/medicosM');

const getMedicos = async (req,res)=>{
    const medicosall = await Medicos.find({estado:'activo'}).populate('usuario','nombre')
                                    .populate('hospital','nombre');
    res.json({
        ok:true,
        medicosall
    })
}
const getMedicosId = async (req,res)=>{
    
    const id = req.params.id;
    const medico = await Medicos.findById(id)
                                    .populate('usuario','nombre')
                                    .populate('hospital','nombre');
    if(!medico){
        return res.status(400).json({
            ok:false,
            msg:"El id del Medico no Existe"
        })
    }
    res.json({
        ok:true,
        medico
    })
}
const postMedicos = async(req,res)=>{
    const uid= req.uid;
    const medicos = new Medicos({usuario:uid,...req.body});
    try {
        const insertMedico = await medicos.save();
            res.json({
                ok:true,
                insertMedico
            });
        
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:"Error Inesperado"
        })
    }
}
const putMedicos = async (req,res)=>{
    const id = req.params.id;
    const uid = req.uid;
    const BDmedico = await Medicos.findById(id);
    if(!BDmedico){
        return res.status(404).json({
            ok:false,
            msg:"El id del Medico no Existe"
        });
    }
    const medicoCambios = {...req.body,usuario:uid};
    const medicoActualizado = await Medicos.findByIdAndUpdate(id,medicoCambios,{new:true});
    res.json({
        ok:true,
        medicoActualizado
    })
}
const deleteMedicos = async (req,res) =>{
    const id = req.params.id;
    const {nombre,img,usuario,hospital,...valor} = req.body;
    const BDmedico = await Medicos.findById(id);
    if(!BDmedico){
        return res.status(404).json({
            ok:false,
            msg:"El id del medico no existe"
        });
    }
    const eliminarMedico = await Medicos.findByIdAndUpdate(id,valor,{new:true})
    res.json({
        ok:true,
        msg:"usuario Eliminado"
    })
}
module.exports={getMedicos,postMedicos,putMedicos,deleteMedicos,getMedicosId}