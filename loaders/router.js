const routes = require('../api/routes')
const middleware = require('../api/middleware')
const expressJwt = require('express-jwt')
const { secretKey } = require('../config')

/**
 * This handles setting
 * @param {*} app 
 */

module.exports = function (app) {
    app.use('/api/auth/', routes.UserRoute)
    app.use('/api/public/', routes.PublicRoute)
    app.use(
    expressJwt({
        secret: secretKey,
        getToken: req => req.cookies.token,
        algorithms: ['HS256']
    })
    );
    app.use('/api/admin/:userId', 
        middleware.adminHandler.checkIfAdmin, 
        middleware.userCheck.protectedRoute, 
        middleware.userCheck.setCurrentUser,
        routes.AdminRoute)
    app.get('/api/confirmUser', middleware.userCheck.confirmUser)
    app.use('/api/products/', 
        middleware.userCheck.protectedRoute,
        middleware.userCheck.setCurrentUser, 
        routes.ProductRoute)
    app.use('/api/cart/',
        middleware.userCheck.protectedRoute,
        middleware.userCheck.setCurrentUser,
        routes.CartRoute)
    app.use(middleware.errorHandler)
}