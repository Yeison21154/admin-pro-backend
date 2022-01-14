const {Router} = require('express');
const {getUsuarios,crearUsuarios,ActualizarUsuario,deleteUsuario} = require('../controllers/usuariosC');
const {check} = require('express-validator');
const {validarCampos}= require('../middlewares/validar-campos');
const { route } = require('express/lib/application');
const { JWT } = require('../middlewares/validar-JWT');
// /api/usuarios
const router = Router();

router.get('/',JWT,getUsuarios);
router.post('/',[
    check('nombre','El nombre en Obligatorio').not().isEmpty(),
    check('password','La contraseña es Obligatoria').not().isEmpty(),
    check('email',"El Email es Obligatorio y debe ser un Correo").isEmail(),
    validarCampos,
],crearUsuarios);
router.put('/:id',[
    check('nombre','El nombre en Obligatorio').not().isEmpty(),
    check('email',"El Email es Obligatorio y debe ser un Correo").isEmail(),
    check('rol','El rol es Obligatoria').not().isEmpty(),
    validarCampos,
],ActualizarUsuario);
router.patch('/:id',[
    check('Estado','El estado del usuario es obligatorio').not().isEmpty(),
    validarCampos
],deleteUsuario)

module.exports = router;