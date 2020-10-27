const {adminControl} = require("../../loaders/firebase");
const loggerFunction = require('../../loaders/logger')

exports.checkIfAdmin = async function(req, res, next){
    try {
        const userId = req.params.userId
        const response = await adminControl.getUser(userId)
        const isAdmin = response.customClaims.admin
            if(!isAdmin){
                throw new Error('You are not allowed to access this page')
            }
        loggerFunction('info', 'current user is an admin user')
        return next();
  
    } catch (error) {
        return next({
        message: error.message,
        status: 403
        })
    }
}