const jwt = require("jsonwebtoken");
const Usuarios = require('../models/usuarioM');


const JWT = (req,res,next) =>{

    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            ok:false,
            msg:"No hay token en la aplicacion"
        });
    }
    try {
     const {uid,nombre}= jwt.verify(token,process.env.SECRET_JWT);
        req.usuarioT = {uid,nombre}
        req.uid = uid

        next();

    } catch (error) {
        res.status(401).json({
            ok:false,
            msg:"token no valido"
        });
    }

}
const ValidarRole = async (req,res,next) =>{
    const uid = req.uid;
    try {
    const usuarioBD = await Usuarios.findById(uid);
    if(!usuarioBD){
        return res.status(403).json({
            ok:false,
            msg:"El id del usuario no existe"
        });
    }
    
    if(usuarioBD.rol !== 'ADMIN_ROLE'){
        return res.status(403).json({
            ok:false,
            msg:"No tienes Permisos de Administrador"
        });
    }
    next();

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:"Hable con el Administrador"
        })
    }
}
const ValidarRoleMismo = async (req,res,next) =>{
    const uid = req.uid;
    const _id = req.params.id;
    try {
    const usuarioBD = await Usuarios.findById(uid);
    if(!usuarioBD){
        return res.status(403).json({
            ok:false,
            msg:"El id del usuario no existe"
        });
    }
    
    if(usuarioBD.rol !== 'ADMIN_ROLE' && uid !== _id){
        return res.status(403).json({
            ok:false,
            msg:"No tienes Permisos de Administrador"
        });
    }
    next();

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:"Hable con el Administrador"
        })
    }
}


module.exports={JWT,ValidarRole,ValidarRoleMismo}