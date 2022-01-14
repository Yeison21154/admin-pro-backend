const Hospital = require('../models/hospitalM');

const getHospital = async(req,res)=>{
    const hospital = await Hospital.find().populate('usuario','nombre');
    res.json({
        ok:true,
        hospital
    })
}
const postHospital = async (req,res)=>{
    const uid = req.uid;
    const hospital = new Hospital({usuario:uid,...req.body})
    try {
        const HospitalSave = await hospital.save();
        res.json({
            ok:true,
            hospital:HospitalSave
        })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:"Hable con el Administrador"
        })
    }
}
const putHospital = async (req,res)=>{
    const idHospital = req.params.id;
    const uid = req.uid;
    const hospitalBD = await Hospital.findById(idHospital);
    if(!hospitalBD){
        return res.status(404).json({
            ok:false,
            msg:"el id del Hospital no es Valido"
        });
    }
    const hospitalCambios = {
        ...req.body,
        usuario:uid
    }
    const hospitalActualizado  = await Hospital.findByIdAndUpdate(idHospital,hospitalCambios,{new:true});
    res.json({
        ok:true,
        hospitalActualizado
    });
}
const deleteHospital = async (req,res)=>{
    const idHospital = req.params.id;
    const hospitalBD = await Hospital.findById(idHospital);
    if(!hospitalBD){
        return res.status(404).json({
            ok:false,
            msg:"el id del Hospital no es Valido"
        });
    }
    await Hospital.findByIdAndDelete(idHospital);
    
    res.json({
        ok:true,
        msg:"Hospital Eliminado"
    });
}
module.exports={getHospital,postHospital,putHospital,deleteHospital}