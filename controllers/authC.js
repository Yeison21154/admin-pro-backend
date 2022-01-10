const bcrypt  = require('bcryptjs');
const { validaJWT } = require('../helpers/validarJWT');
const Usuario = require("../models/usuario");


const login = async(req,res)=>{
    const {email,password} = req.body;

    const BDuser = await Usuario.findOne({email});
    if(!BDuser){
        return res.status(404).json({
            ok:false,
            msg:"El Correo no existe"
        });
    }
    const valPassword = await bcrypt.compareSync(password, BDuser.password)
    if(!valPassword){
        return res.status(404).json({
            ok:false,
            msg:"password invalid"
        });
    }
    const token = await validaJWT(BDuser.id);
    try {
        res.json({
            ok:true,
            token
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:"Hable con el Administrador"
        })
    }
}


module.exports={login}