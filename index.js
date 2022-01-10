const express = require('express');
require('dotenv').config();
const { listen } = require('express/lib/application');
const {dbConnection} = require('./database/config')
const cors = require('cors')
//Crear Servidor Express
const app = express();
//Configurar CORS
app.use(cors());
//lectura del Body
app.use(express.json());
//Base de Datos
dbConnection();
//rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));


app.listen(process.env.PORT,()=>{
    console.log("Servidor corriendo en Servidor "+process.env.PORT);
})
















































































































//x08Cg6nS1YVflXO6
//hosp_yeison
//npm i dotenv
//Crear el servidor de express