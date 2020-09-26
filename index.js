const {
    port
} = require("./config");
const functions = require('firebase-functions');
const server = require("./loaders/app");
const loggerFunction = require("./loaders/logger");


server.listen(port, function () {
    loggerFunction("info", `Serving is running on PORT ${port}`);

})
