const Usuario = require('../models/usuarioM');
const bcrypt  = require('bcryptjs');
const { validaJWT } = require('../helpers/generaJWT');

const getUsuarios = async (req,res)=>{
    const desde = Number(req.query.desde) || 0;
    const [usuarios,total] = await Promise.all([
        Usuario.find({Estado:'Activo'},'nombre email rol google Estado img')
               .skip(desde)
               .limit(5),
        Usuario.countDocuments()
    ]);
    res.status(200).json({
        ok:true,
        usuarios,
        uid:req.uid,
        usuarioT:req.usuarioT,
        total
    });
}
const crearUsuarios = async (req,res) =>{
    const {nombre,password,email} = req.body;
    try {
        const existeE = await Usuario.findOne({email});
        if(existeE){
            return res.status(404).json({
                ok:false,
                msg:"El Correo ya Existe"
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
       const {password,google,Estado,email,...campos} = req.body;
       if(usuarioDB.email !== email){
            const existeEmail = await Usuario.findOne({email});
            if(existeEmail){
                return res.status(404).json({
                    ok:false,
                    msg:"Ya Existe un usuario con ese Email"
                });
            }
       }
       if(!usuarioDB.google){
           campos.email = email;
       }else if (usuarioDB.email !== email){
        return res.status(404).json({
            ok:false,
            msg:"usuarios de Google no pueden cambiar su correo"
        });
       }
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