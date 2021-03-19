const jwt = require('jsonwebtoken');
const { secretKey } = require('../../config')
const {db, adminControl} = require('../../loaders/firebase');
const loggerFunction = require('../../loaders/logger');
const expressJwt = require('express-jwt');


exports.protectedRoute = function(req, res, next){
    try {
        let token = req.cookies.token
        if(token === undefined){
            throw new Error('token must be provided')
        }
        jwt.verify(token, secretKey,  async (error, decoded) =>{
            if(decoded){
                loggerFunction('info', `${decoded.username} has permission to access protected route`)
                return next()
            } else{
                throw new Error(error)
            }
        })
    } catch (error) {
        return next({
            message: error.message,
            status: 401
        })
    }
}

exports.setCurrentUser = function (req, res, next) {
    try {
        let token = req.cookies.token
        if(token === undefined){
            throw new Error('token must be provided')
        }
        jwt.verify(token, secretKey, async (error, decoded) => {
            if (error) {
                throw new Error(error)
                
            }
            const snapshot = await db.ref('users').child(decoded._id).once('value')
            const exists = snapshot.val() !== null;
            const user = snapshot.val()
            if (!exists || user._id !== decoded._id ) {
                throw new Error('User does not exist')
            }
            delete user.password
            delete user.email
            req.user = user
            req.isAdmin = user.isAdmin
            loggerFunction('info', ` current user is set as user ${user.username}`)
            return next()
        })
    } catch (error) {
        return next({
            message: error.message,
            status: 401
        })
    }
}

exports.confirmUser = function (req, res, next) {
    try {
        let token = req.cookies.token;
        if(token === undefined){
            throw new Error('token must be provided');
        }
        jwt.verify(token, secretKey, async (error, decoded) => {
            if (error) {
                throw new Error(error);
            }
            const snapshot = await db.ref('users').child(decoded._id).once('value');
            const exists = snapshot.val() !== null;
            const user = snapshot.val();
            if (!exists || user._id !== decoded._id ) {
                throw new Error('User does not exist')
            }
            req.user = user
            req.isAdmin = user.isAdmin
            if(user.isAdmin){
                await adminControl.setCustomUserClaims(decoded._id, {
                    admin: true
                })
            }
            loggerFunction('info', ` user ${user.username} has it token verified`)
            return res.status(200).json({
                message: {
                    user,
                    token
                }
            })
        })
    } catch (error) {
        return next({
            message: error.message,
            status: 401
        })
    }
}

exports.jwtToken = function(){
     expressJwt({
            secret: secretKey,
            getToken: req => req.cookies.token,
            algorithms: ['HS256']
        })
}