const {Router} = require('express');
const {fileArchivo,retornaImagen} = require('../controllers/uploadC');
const fileUpload = require('express-fileupload');
const {check} = require('express-validator');
const {validarCampos}= require('../middlewares/validar-campos');
const { JWT } = require('../middlewares/validar-JWT');
// /api/usuarios
const ruta = Router();
ruta.use(fileUpload());
ruta.put('/:tipo/:id',[
    JWT,
    check('id',"El Id debe ser Valido para cualquier tipo que envies").isMongoId(),
    validarCampos
],fileArchivo);
ruta.get('/:tipo/:foto',retornaImagen);

module.exports = ruta;