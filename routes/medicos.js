const {Router} = require('express');
const {check} = require('express-validator');
const {getMedicos,postMedicos,putMedicos,deleteMedicos} = require('../controllers/medicosC');
const {validarCampos}= require('../middlewares/validar-campos');
const { route } = require('express/lib/application');
const { JWT } = require('../middlewares/validar-JWT');
// /api/usuarios
const router = Router();

router.get('/',[JWT],getMedicos);
router.post('/',[
    JWT,
    check('nombre',"El nombre del Medico es necesario").not().isEmpty(),
    check('hospital',"El nombre del Id debe ser Valido").isMongoId(),
    validarCampos
],postMedicos);
router.put('/:id',[JWT],putMedicos);
router.patch('/:id',[JWT],deleteMedicos)

module.exports = router;