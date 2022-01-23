const express = require('express');
require('dotenv').config();
const { listen } = require('express/lib/application');
const {dbConnection} = require('./database/config');
const  path = require('path');

//Configurar CORS
const cors = require('cors')
//directorio
//Crear Servidor Express
const app = express();
//Base de Datos
dbConnection();
app.use(express.static('public'));
app.use(cors());
//lectura del Body
app.use(express.json());
//rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busqueda'));
app.use('/api/upload', require('./routes/upload'));

app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'public/index.html'));
});
app.listen(process.env.PORT,()=>{
    console.log("Servidor corriendo en Servidor "+process.env.PORT);
})
















































































































//npm i dotenv
//Crear el servidor de express