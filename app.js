const express 		= require('express');
const logger 	    = require('morgan');
const bodyParser 	= require('body-parser');
const passport      = require('passport');
const pe            = require('parse-error');
const cors          = require('cors');
const v1 = require('./routes/v1');
const path = require("path");

const app = express();

const CONFIG = require('./config/config');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Passport
app.use(passport.initialize());

//Log Env
console.log("Environment:", CONFIG.app)

//DATABASE
const models = require("./models");

// CORS
app.use(cors());

app.use('/v1', v1);

if (CONFIG.app === 'production') {
    app.use(express.static(path.join(__dirname, 'client', 'dist','demo-ag-app')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist','demo-ag-app', 'index.html'));
    });
}else{
  app.use('/', function(req, res){
    res.statusCode = 200;//send the appropriate status code
    res.json({status:"success", message:"Mongo API", data:{}})
  });
}



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});




// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{
    message: err.message,
    error: {}
  });
});

module.exports = app;

process.on('unhandledRejection', error => {
    console.error('Uncaught Error', pe(error));
}); 
