const express = require('express');
const router = express.Router()
const {celebrate, Joi} = require('celebrate');
const Service = require('../../services/');

router.post('/register',celebrate({
    body: Joi.object({
        name: Joi.string().required(),
        username: Joi.string().required(),
        userId: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required().min(8)
        })
    }), async (req, res, next) =>{
    try {
        const UserService = new Service.UserService(req.body)
        const {
            generateUserToken,
            newUser
        } = await UserService.signUp();
        return res.status(200).json({
            message: {
                newUser,
                generateUserToken
            }
        })
    } catch (error) {
        if (error.code === 11000) {
            error.message = 'Sorry, this email/username is taken';
        }
        return next({
            message: error.message,
            status: 500
        })
    }
    
})

router.post('/login', celebrate({
    body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    })
    }), async (req, res, next) => {
        try {
            const UserService = new Service.UserService(req.body)
            const {
                generateUserToken,
                newUser
            } = await UserService.signIn();
            return res.status(200).json({
                message: {
                    newUser,
                    generateUserToken
                }
            })
        } catch (error) {
            if (error.code === 'auth/wrong-password') {
                error.message = 'Sorry, this email/password combination is incorrect';
            }
            if (error.code === 'auth/user-not-found') {
                error.message = "Sorry, this email isn't located in our account.Please register";
            }
            return next({
                message: error.message,
                status: 500
            })
        }
})

router.post('/send-password-reset', 
     async (req, res, next) => {
        try {
            const response = await Service.UserService.sentResetPassword(req.body.emailAddress)
            return res.status(200).json({
                message: response
            })
        } catch (error) {
            return next({
                message: error.message,
                status: 500
            })
        }
})

router.post('/reset-password',
    celebrate({
        body:Joi.object({
            code: Joi.string(),
            email:Joi.string().email({ minDomainSegments: 2 }).required(),
            password: Joi.string().min(8).required(),
            confirmPassword: Joi.ref('password')
        }).with('password', 'confirmPassword')
    }),
    async (req, res, next) => {
        try {

            const response = await Service.UserService.resetPassword(req.body.code, req.body.password)
            return res.status(200).json({
                message: response
            })
        } catch (error) {
            if (error.code === 'auth/invalid-action-code') {
                error.message = 'Token is invalid or has expired';
            }
            return next({
                message: error.message,
                status: 500
            })
        }
})

router.get('/logout', async (req, res, next) => {
    try {
        const response = await Service.UserService.signOut()
        return res.status(200).json({
            message: response
        })
    } catch (error) {

        return next({
            message: error.message,
            status: 500
        })
    }
})
module.exports = router;