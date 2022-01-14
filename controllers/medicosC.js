const Medicos = require('../models/medicosM');

const getMedicos = async (req,res)=>{
    const medicosall = await Medicos.find().populate('usuario','nombre')
                                    .populate('hospital','nombre');
    res.json({
        ok:true,
        medicosall
    })
}
const postMedicos = async(req,res)=>{
    const uid= req.uid;
    const idHospital = "61dc13f7d207a066c2ca7eed";
    const medicos = new Medicos({usuario:uid,hospital:idHospital,...req.body});
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
const putMedicos = (req,res)=>{
    res.json({
        ok:true,
        msg:"putMedicos"
    })
}
const deleteMedicos = (req,res)=>{
    res.json({
        ok:true,
        msg:"deleteMedicos"
    })
}
module.exports={getMedicos,postMedicos,putMedicos,deleteMedicos}