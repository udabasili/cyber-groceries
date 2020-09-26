const jwt = require('jsonwebtoken')
const { secretKey } = require('../../config')
const {db, adminControl} = require('../../loaders/firebase')
const loggerFunction = require('../../loaders/logger')

exports.protectedRoute = function(req, res, next){
    try {
        let token = req.headers['authorization']
        if(token === undefined){
            return res.status(401).json({
                status: 401,
                message: 'UnAuthorized'
            })
        }
        token = token.split(' ')[1]
        jwt.verify(token, secretKey,  async (error, decoded) =>{
            if(decoded){
                loggerFunction('info', `${decoded.username} has permission to access protected route`)
                return next()
            } else{
                return res.status(401).json({
                    status: 401,
                    message: 'UnAuthorized'
                })
            }
        })
    } catch (error) {
        return next(error)
    }
}

exports.setCurrentUser = function (req, res, next) {
    try {
        let token = req.headers['authorization']
        if (token === undefined) {
            return res.status(401).json({
                status: 401,
                message: 'UnAuthorized'
            })
        }
        token = token.split(' ')[1]
        jwt.verify(token, secretKey, async (error, decoded) => {
            if (error) {
                return res.status(401).json({
                    status: 401,
                    message: 'UnAuthorized'
                })
            }
            const snapshot = await db.ref('users').child(decoded._id).once('value')
            const exists = snapshot.val() !== null
            if (!exists) {
                return res.status(401).json({
                    status: 401,
                    message: 'UnAuthorized'
                })
            }
            const user = snapshot.val()
            delete user.password
            delete user.email
            req.user = user
            req.isAdmin = user.isAdmin
            loggerFunction('info', ` current user is set as user ${user.username}`)

            return next()
        })
    } catch (error) {
        return next(error)
    }
}

exports.confirmUser = function (req, res, next) {
    try {
        let token = req.headers['authorization']
        if (token === undefined) {
            return res.status(401).json({
                status: 401,
                message: 'UnAuthorized'
            })
        }
        token = token.split(' ')[1]
        jwt.verify(token, secretKey, async (error, decoded) => {
            if (error) {
                return res.status(401).json({
                    status: 401,
                    message: 'UnAuthorized'
                })
            }
            const snapshot = await db.ref('users').child(decoded._id).once('value')
            const exists = snapshot.val() !== null
            if (!exists) {
                return res.status(401).json({
                    status: 401,
                    message: 'UnAuthorized'
                })
            }
            const user = snapshot.val()
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
        return next(error)
    }
}