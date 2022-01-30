const jwt = require('jsonwebtoken');



const validaJWT = (uid) =>{

    return new Promise( (resolve, reject) =>{

        const payload = {
            uid,
            nombre:"yeison amado"
        }
        const expira = {
            expiresIn:'12h'
        }
        jwt.sign(payload, process.env.SECRET_JWT,expira,(error,token)=>{
            if(error){
                console.log(error);
                reject(error);
            }
            resolve(token)
        })

    })

}
module.exports = {validaJWT}