const Usuario = require('../models/usuario');
const bcrypt  = require('bcryptjs');
const { validaJWT } = require('../helpers/validarJWT');

const getUsuarios = async (req,res)=>{
    const usuarios = await Usuario.find({},'nombre email rol google Estado');
    res.status(200).json({
        ok:true,
        usuarios,
        uid:req.uid
    });
}
const crearUsuarios = async (req,res) =>{
    const {nombre,password,email} = req.body;
    try {
        const existeE = await Usuario.findOne({email});
        if(existeE){
            return res.json({
                ok:false,
                msg:"El Usuario ya Existe"
            })
        }
        const usuario = new Usuario(req.body);
        //encryptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt);
        await usuario.save();
        const token = await validaJWT(usuario.uid);
        res.status(201).json({
            ok:true,
            msg:"Usuario creado",
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Error Inesperado"
        })
    }
}
const ActualizarUsuario = async(req,res) =>{
    const uid= req.params.id;
    try {
       const usuarioDB = await Usuario.findById(uid);
       
       if(!usuarioDB){
           return res.status(404).json({
               ok:false,
               msg:"No existe usuario por ese Id"
           })
       }
       //aca desestructuro mi body y le quito los campos que no quiero mandar
       const {password,google,email,...campos} = req.body;
       if(usuarioDB.email !== email){
            const existeEmail = await Usuario.findOne({email});
            if(existeEmail){
                return res.status(404).json({
                    ok:false,
                    msg:"Ya Existe un usuario con ese Email"
                });
            }
       }
        campos.email = email;
        const UserActualizado = await Usuario.findByIdAndUpdate(uid,campos,{new:true});
        res.json({
            ok:true,
            UserActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Error Inesperado"
        });
    }
}
const deleteUsuario = async (req,res) =>{
    const {email,password,nombre,rol,img,google,...object} = req.body
    const uid = req.params.id;
    try {
        const BDuser = await Usuario.findById(uid);
        if(!BDuser){
            return res.status(404).json({
                ok:false,
                msg:"El Usuario Id no Existe"
            });
        }
        const userEliminado = await Usuario.findByIdAndUpdate(uid,object,{new:true});
        res.json({
            ok:true,
            msg:"Usuario Eliminado",
            userEliminado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Error Inesperado"
        });
    }

}

module.exports = {getUsuarios,crearUsuarios,ActualizarUsuario,deleteUsuario  }