const winston = require("winston");
const { paperTrailHost, paperTrailPort } = require("../config");
require('winston-papertrail').Papertrail;

let winstonTransport = []

if (process.env.NODE_ENV ===  'production'){
    let winstonPaperTrail = new winston.transports.Papertrail({ 
        host: paperTrailHost,
        port: paperTrailPort,
        logFormat: function(level, message) {
            let mess = `${dateFormat()} | ${level.toUpperCase()} | loggers.log | ${message} | `
            return mess
        }
    })
    winstonPaperTrail.on('error', function(err) {
        // Handle, report, or silently ignore connection errors and failures
    });
    winstonTransport.push(winstonPaperTrail)
} else {
    const winstonTransports = new winston.transports.File({
        filename: `./logs/logger.log`
    })
    winstonTransport.push(winstonTransports)

}

dateFormat = () => {
    return new Date(Date.now()).toUTCString()
};

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        ...winstonTransport
    ],
    format: winston.format.printf((info) => {
        let mess = `${dateFormat()} | ${info.level.toUpperCase()} | loggers.log | ${info.message} | `
        return mess
    })

});

/**
 * create a custom logger function
 * @param {String} level 
 * @param {String} message 
 */
const loggerFunction = (level, message) => {
    logger.log({
        level,
        message
    })
}

module.exports = loggerFunction;