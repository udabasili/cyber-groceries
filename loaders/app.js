const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const path = require('path');
const loggerFunction = require('./logger');
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean")
const mongoSanitize = require('express-mongo-sanitize')
const expressJwt = require('express-jwt');
const cookieParser = require('cookie-parser');
const { secretKey } = require('../config');
const csrf = require('csurf');


app.set('trust proxy', 1);
app.disable('x-powered-by')

 const csrfProtection = csrf({
  cookie: true,
  ignoreMethods:['GET', 'HEAD', 'OPTIONS', 'PUT', 'DELETE']
});

app.use(function(request, response, next) {

if (process.env.NODE_ENV !== 'development' && !request.secure) {
   return response.redirect("https://" + request.headers.host + request.url) } 
   next()}
)

app.use(cookieParser());
app.use(csrfProtection);


app.get('/api/csrf-token', (req, res) => {
    loggerFunction('info', 'cs gotten' )
    res.json({ csrfToken: req.csrfToken() });
});

/**
 * SECURITY MIDDLEWARE
 */
// app.use(helmet())
const limit = rateLimit({
    max: 100, // max requests
    windowMs: 60 * 60 * 1000, // 1 Hour
    message: 'Too many requests' // message to send
});

//middleware
app.use(bodyParser.json({limit: '40kb'}));
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(cors());
app.use(limit)
app.use(xss())
app.use(mongoSanitize());


/**LOADERS */
require('./router')(app)


/**STATIC FILES */
if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../client/build')))
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'))
    })
}
    



module.exports = app