// conexion de base de datos
const mysql = require('mysql');

// trasformación de codigo de colbas a codigo de promesas
const {promisify} = require('util');

// llamamos solo al database del objeto creado en keys
const {database} = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) =>{
    // validacion de posibles errores
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.log('BD fue desconectada');
        } 

        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.log('DB conectados');
        }

        if(err.code === 'ECONNREFUSED'){
            console.log('DB rechazada');
        }
    }

    // conexion satisfactorio
    if(connection) connection.release();
    console.log('BD conectado');
    return;
});

// podemos realizar consultas mediantes promesas
pool.query =  promisify(pool.query);

// exportancion de BD
module.exports = pool;


