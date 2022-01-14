const {Router} = require('express');
const { check } = require('express-validator');
const {login,googleSingIng}= require('../controllers/authC');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.post('/',[
    check('email','El Correo es Obligatorio').isEmail(),
    check('password','el password es Obligatorio').not().isEmpty(),
    validarCampos
],login);
router.post('/google',[
    check('token','El Token de Google es Obligatorio').not().isEmpty(),
    validarCampos
],googleSingIng)

module.exports=router;