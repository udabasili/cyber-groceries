const routes = require('../api/routes')
const middleware = require('../api/middleware')
const expressJwt = require('express-jwt')
const { secretKey } = require('../config')
const rateLimit = require("express-rate-limit");


const loginLimit = rateLimit({
    max: 10, // max requests
    windowMs: 15 * 60 * 1000, // 15 minutes,
    message: 'You have attempted too many time. Please try again later ' // message to send
});

const limit = rateLimit({
    max: 100, // max requests
    windowMs: 20 * 60 * 1000, // 15 minutes,
    message: 'You have attempted too many time. Please try again later ' // message to send
});

/**
 * This handles setting
 * @param {*} app 
 */

module.exports = function (app) {
    app.use('/api/auth/', loginLimit , routes.UserRoute)
    app.use('/api/public/', routes.PublicRoute)
    app.use('/api/admin/:userId', 
        expressJwt({
            secret: secretKey,
            getToken: req => req.cookies.token,
            algorithms: ['HS256']
        }),
        middleware.adminHandler.checkIfAdmin, 
        middleware.userCheck.protectedRoute, 
        middleware.userCheck.setCurrentUser,
        routes.AdminRoute)
    app.get('/api/confirmUser',
     expressJwt({
            secret: secretKey,
            getToken: req => req.cookies.token,
            algorithms: ['HS256']
        }),
     middleware.userCheck.confirmUser)
    app.use('/api/products/', 
     expressJwt({
            secret: secretKey,
            getToken: req => req.cookies.token,
            algorithms: ['HS256']
        }),
        middleware.userCheck.protectedRoute,
        middleware.userCheck.setCurrentUser, 
        routes.ProductRoute)
    app.use('/api/cart/',
     expressJwt({
            secret: secretKey,
            getToken: req => req.cookies.token,
            algorithms: ['HS256']
        }),
        middleware.userCheck.protectedRoute,
        middleware.userCheck.setCurrentUser,
        routes.CartRoute)
    app.use(middleware.errorHandler)
}