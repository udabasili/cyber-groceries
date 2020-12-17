const winston = require("winston");
const { paperTrailHost, paperTrailPort } = require("../config");
const os = require('os');
require('winston-syslog');



let winstonTransport = []

if (process.env.NODE_ENV ===  'production'){
    const winstonPaperTrail = new winston.transports.Syslog({
        host: paperTrailHost,
        port: paperTrailPort,
        protocol: 'tls4',
        localhost: os.hostname(),
        eol: '\n',
    })
 
    winstonTransport.push(winstonPaperTrail)
} else {
    const winstonTransports = new winston.transports.Console()
    winstonTransport.push(winstonTransports)

}

dateFormat = () => {
    return new Date(Date.now()).toUTCString()
};

const logger = winston.createLogger({
    transports: [
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