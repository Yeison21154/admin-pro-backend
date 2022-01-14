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
const putHospital = (req,res)=>{
    res.json({
        ok:true,
        msg:"putHospital"
    })
}
const deleteHospital = (req,res)=>{
    res.json({
        ok:true,
        msg:"deleteHospital"
    })
}
module.exports={getHospital,postHospital,putHospital,deleteHospital}