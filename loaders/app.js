
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const loggerFunction = require('./logger');
const xss = require("xss-clean")
const mongoSanitize = require('express-mongo-sanitize')
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const redirectSSL = require('redirect-ssl')

if (process.env.NODE_ENV === 'production'){
    app.use(redirectSSL)
}
 const csrfProtection = csrf({
  cookie: true,
  ignoreMethods:['GET', 'HEAD', 'OPTIONS', 'PUT', 'DELETE']
});


app.use(cookieParser());
app.use(csrfProtection);


app.get('/api/csrf-token', (req, res) => {
    try {
        loggerFunction('info', 'cs gotten' )
        res.json({ csrfToken: req.csrfToken() });
    } catch (error) {
        console.log(error)
        
    }

});

/**
 * SECURITY MIDDLEWARE
 */

//middleware
app.use(bodyParser.json({limit: '40kb'}));
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(xss())
app.use(mongoSanitize());


/**LOADERS */
require('./router')(app)


/**STATIC FILES */
if (process.env.NODE_ENV === 'production'){
    
}
    



module.exports = app