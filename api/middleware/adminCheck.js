const {
    db,
    auth,
    adminControl
} = require("../../loaders/firebase");
const loggerFunction = require('../../loaders/logger')

exports.checkIfAdmin = async function(req, res, next){
    try {
        const userId = req.params.userId
        const response = await adminControl.getUser(userId)
        const isAdmin = response.customClaims.admin
            if(!isAdmin){
                return next({
                    message: 'You are not allowed to access this page',
                    status: 403
                })

            }
            loggerFunction('info', 'current user is an admin user')
            return next();
  
    } catch (error) {
        return next({
        message: error.message,
        status: 401
        })
    }
}