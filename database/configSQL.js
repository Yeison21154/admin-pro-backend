const sql = require('mssql')



const conecctionString = {
    user:'sa',
    password:'J@gMiatca',
    database:'Sistema_Justino_2020_NN',
    server:'localhost',
    options:{
      encrypt: true, 
      trustServerCertificate: true 
    }

}
const dbConnet = async () =>{
try {
        const pool = await sql.connect(conecctionString);
        console.log("SQL Conectado");
        return pool;
        //con = await sql.query('select * from usuarios');
    
} catch (error) {
    console.log(error);
    throw new Error("Error al conectarse a Sql server")
}
}

module.exports = {dbConnet}