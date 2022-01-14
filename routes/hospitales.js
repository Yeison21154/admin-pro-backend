const {Router} = require('express');
const {check} = require('express-validator');
const {getHospital,postHospital,putHospital,deleteHospital} = require('../controllers/hospitalesC');
const {validarCampos}= require('../middlewares/validar-campos');
const { route } = require('express/lib/application');
const { JWT } = require('../middlewares/validar-JWT');
// /api/usuarios
const router = Router();

router.get('/',[JWT],getHospital);
router.post('/',[
    JWT,
    check('nombre',"El nombre del Hospital es necesario").not().isEmpty(),
    validarCampos
],postHospital);
router.put('/:id',[JWT],putHospital);
router.patch('/:id',[JWT],deleteHospital)

module.exports = router;