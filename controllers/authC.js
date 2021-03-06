const bcrypt  = require('bcryptjs');
const req = require('express/lib/request');
const { googleVerify } = require('../helpers/googleVerify');
const { validaJWT } = require('../helpers/validarJWT');
const Usuario = require("../models/usuarioM");
const {getMenuFronEnd} = require("../helpers/menuFront");


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
            token,
            menu: getMenuFronEnd(BDuser.rol)
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:"Hable con el Administrador"
        })
    }
}
const googleSingIng = async(req,res)=>{
    const tokenGoogle = req.body.token;
    try {
        const {name,picture,email} = await googleVerify(tokenGoogle);
        const usuarioDB = await Usuario.findOne({email});
        let usuario; 
        if(!usuarioDB){
            usuario = new Usuario({
                nombre:name,
                email,
                password:'123456',
                img:picture,
                google:true
            });
        }else{
            usuario = usuarioDB;
            usuario.google = true;
            usuario.password = '123456';
        }
        await usuario.save();
        const token = await validaJWT(usuario.id);
        //jwt
        res.json({
            ok:true,
            token,
            menu: getMenuFronEnd(usuarioDB.rol)
        })
    } catch (error) {
         res.status(401).json({
            ok:false,
            msg:"token no Correcto"
        })
    }
}
const renewToken = async(req,res) =>{
    const uid = req.uid;
    const token = await validaJWT(uid);
    const usuarioDB = await Usuario.findById(uid);
    try {
        res.json({
            ok:true,
            token,
            usuarioDB,
            menu: getMenuFronEnd(usuarioDB.rol)
        })
    } catch (error) {
        res.status(401).json({
            ok:false,
            msg:"Hable con el Administrador"
        })
    }
  
}

module.exports={login,googleSingIng,renewToken}