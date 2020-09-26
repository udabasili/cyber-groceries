const routes = require('../api/routes')
const middleware = require('../api/middleware')

/**
 * This handles setting
 * @param {*} app 
 */
module.exports = function (app) {
    app.use('/api/products/', routes.PublicRoute)
    app.use('/api/products/', 
        middleware.userCheck.protectedRoute,
        middleware.userCheck.setCurrentUser, 
        routes.ProductRoute)
    app.use('/api/cart/',
        middleware.userCheck.protectedRoute,
        middleware.userCheck.setCurrentUser,
        routes.CartRoute)
    app.use('/api/auth/', routes.UserRoute),
    app.use('/api/admin/:userId', 
        middleware.adminHandler.checkIfAdmin, 
        middleware.userCheck.protectedRoute, 
        middleware.userCheck.setCurrentUser,
        routes.AdminRoute)
    app.get('/api/confirmUser', middleware.userCheck.confirmUser)
    app.use(middleware.errorHandler)
}