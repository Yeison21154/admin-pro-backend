const jwt = require("jsonwebtoken");



const JWT = (req,res,next) =>{

    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            ok:false,
            msg:"No hay token en la aplicacion"
        });
    }
    try {
     const {uid} = jwt.verify(token,process.env.SECRET_JWT);
        req.uid = uid;
        next();

    } catch (error) {
        res.status(401).json({
            ok:false,
            msg:"token no valido"
        });
    }

}



module.exports={JWT}