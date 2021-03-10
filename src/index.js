// requerimientos
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars'); //motor de html a handlebars
// metodo path para reconocer direcctorios
const path = require('path');
const { extname } = require('path');

// mensajes de error 
const flash = require('connect-flash');
// sesiones
const session = require('express-session');
const MySQlStore = require('express-mysql-session');
const { database } = require('./keys');

// passport autentificacion
const passport = require('passport');

// inicialización
const app = express();
require('./lib/passport');

// configuraciones
app.set('port', process.env.PORT || 4000); // puerto en que se inicalizara
// mostramos donde se encuentra la carpetade vews
app.set('views',path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    usuariosDir: path.join(app.get('views'), 'usuario'),
    // nombre de archivos de handlebars
    extname: '.hbs',
    // documento de funciones de hadlebars
    helpers: require('./lib/handlebars')
}));

// ocupación de motor de handlerbar
app.set('view engine', '.hbs');


// middlewares - peticion es del clente al servidor
app.use(session({
    secret: 'clickOnline',
    resave: false,
    saveUninitialized: false,
    store: new MySQlStore(database)
}));
app.use(flash()); //mensajes de error
app.use(morgan('dev')); // mensajes por consola
app.use(express.urlencoded({extended: false})); //realizar llenado en la bd solo datos sencillos como lo son los string
app.use(express.json()); // extender la aplicaicón si se requiere archivos json con un apartado cliente
// ocupamos passport
app.use(passport.initialize());
app.use(passport.session());

// variables globales
app.use((req, res, next)=>{
    app.locals.satisfactorio = req.flash('satisfactorio');
    app.locals.error = req.flash('error');
    // variable de usuario global
    app.locals.usuario = req.user;
    next();
});

// rutas - definicones de las url
app.use(require('./router/index.js'));
app.use(require('./router/autentificacion'));
// prefijo de link para relizar las acciones necesarias
app.use('/links', require('./router/links'));
app.use('/perfil', require('./router/usuario'));


// archivos publicos
// direccion de la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// inicializamos nuestro servidor
app.listen(app.get('port'), ()=>{
    console.log('Servidor activo en puerto: ', app.get('port'));
});