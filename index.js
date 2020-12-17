const {
    port
} = require("./config");
const functions = require('firebase-functions');
const app = require("./loaders/app");
const loggerFunction = require("./loaders/logger");
const helmet = require('helmet');

app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());
app.set('trust proxy', 1);
app.disable('x-powered-by')
app.listen(port, function () {
    loggerFunction("info", `Serving is running on PORT ${port}`);

})
