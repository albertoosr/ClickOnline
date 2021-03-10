// documento de inicio de sesion
const express = require('express');
const router = express.Router();

const passport = require('passport');

// inicio de sesiòn
router.post('/login', (req, res, next) => {
    passport.authenticate('local.login', {
       successRedirect: '/links',
       failureRedirect: '/',
       failureFlash: true 
    })(req, res, next);
});


// registro de usuario
router.get(('/'), (req, res) => {
    res.redirect('index');
}); // esto no es importante

router.post('/registro', passport.authenticate('local.registro', {
    successRedirect: '/perfil',
    failureRedirect: '/',
    failureFlash: true
}));


router.get('/logout', (req, res) => {
   req.logOut();
   res.redirect('/');
});


module.exports = router;