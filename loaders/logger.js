const winston = require("winston")

let winstonTransport = []

if (process.env.NODE_ENV ===  'production'){
    let winstonPaperTrail = new winston.transports.File({
        filename: `./logs/logger.log`
    })  
 
    winstonTransport.push(winstonPaperTrail)

    const winstonTransports = new winston.transports.Console()
    winstonTransport.push(winstonTransports)

} else if (process.env.NODE_ENV === 'development') {
    const winstonTransports = new winston.transports.Console()
    winstonTransport.push(winstonTransports)

} else{
    let winstonPaperTrail = new winston.transports.File({
        filename: `./logs/logger.log`
    })
    winstonTransport.push(winstonPaperTrail)
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