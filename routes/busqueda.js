const {Router} = require('express');
const check = require('express-validator');

const {getTodo,getCollection} = require('../controllers/busquedaC');
const { JWT } = require('../middlewares/validar-JWT');


const ruta = Router();

ruta.get('/:argumento',[
    JWT
],getTodo);
ruta.get('/:coleccion/:tabla/:argumento',[JWT],getCollection);

module.exports = ruta;