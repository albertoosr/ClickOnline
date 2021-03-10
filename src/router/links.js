// link para accer a lo lives
const express = require('express');

const router = express.Router();

// comprobacion de bd
const pool = require('../database');

router.get('/add', (req, res) => {
    // res.send('Realizar nuevo streaming');
    res.render('links/add');
});


router.post('/add', async (req, res) => {
    // recueramos los datos del formulario
    const {titulo, url, descripcion}  = req.body;
    // creamos un nuea url 
    const nuevoLink = {
        titulo,
        url,
        descripcion,
        status: 0
     
    };
    // peticion asincrona que llevara tiempo
    // ocuapmos await para seguir el proceso
    await pool.query('INSERT INTO streaming set ?', [nuevoLink]);
    req.flash('satisfactorio', 'Streaming registrado exitosamente');
    // res.send('Reciviendo datos'); 
    res.redirect('/links');  

    // aqui ira al streamign pero por ahora
});

router.get('/', async (req, res) => {
    // const links = await pool.query('SELECT * FROM streaming');
    const links = await pool.query('SELECT * FROM  streaming WHERE status = 0');
    console.log(links);
    // res.send('streamings en vivios');
    // pasamos el resultado de la consulta de la bd
    res.render('links/streamings', { links });
});

router.get('/streaming', (req, res) => {
    res.render('links/live');
});


module.exports = router;