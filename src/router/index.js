// Almacenamos rutas principales de nuestra app
const express = require('express');
// recuperamo solo el metodo router de expres
const router = express.Router();

// creamos una ruta de prueba para mostrar mensaje 
router.get('/', (req, res)=>{
    // res.send('Hola mundo en Node.js');
    res.render('index');
});

// exportamos la rutas 
module.exports = router;