var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
const hbs = require('express-handlebars');
var mongo = require('mongodb');
var mongoose = require('mongoose');


var app= express();

mongoose.connect('mongodb://localhost/junior');
var db = mongoose.connection;

var routes = require('./routes/index');
var customer=require('./routes/customer');
var merchent=require('./routes/merchent');
var driver=require('./routes/driver');

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//engine
app.engine('hbs',hbs({extname:'hbs',defaultLayout:'error',layoutsDir:__dirname+'/views'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//middleware
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init



app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use(function(req,res,next)
{
  req.db=db;
  next();
});

app.use('/', routes);
app.use('/customer',customer);
app.use('/merchent',merchent);
app.use('/driver',driver);


app.listen(5000, () => console.log(`Listening on 5000`));
