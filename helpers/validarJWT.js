const jwt = require('jsonwebtoken');

const validaJWT = (uid) =>{
   return new Promise ((resolve,reject)=>{
    payload ={
        uid
    }
    jwt.sign(payload,process.env.SECRET_JWT,{
        expiresIn:"12h"
    },(err,token)=>{
        if(err){
            console.log(err);
            reject(err="No se pudo generar el JWT");
        }else{
            resolve(token);
        }
    });
   });
}

module.exports = {validaJWT}