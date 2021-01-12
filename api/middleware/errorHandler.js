const loggerFunction = require('../../loaders/logger');

module.exports = function (error, req, res, next) {
    console.log(error.message)
    loggerFunction('error', error.message);
    return res.status(error.status || 505).json({
        message: error.message || 'something went wrong'

    })
}