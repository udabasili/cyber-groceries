 

const express = require('express')
const Service = require('../../services/');
const router = express.Router({mergeParams: true})
const {
    celebrate,
    Joi
} = require('celebrate');

router.post(
    "/:userId/order",
    celebrate({
        body: Joi.object({
            email: Joi.string().required(),
            cartItems: Joi.array().required(),
            total: Joi.number().required(),
            completeAddress: Joi.object({
                address: Joi.string().required(),
                province: Joi.string().required()
            }).required(),
            deliveryMethod: Joi.string().required()
        }),
    }),
    async (req, res, next) => {
        try {
            const currentUser =  req.user
            const { email, cartItems, total, deliveryMethod, completeAddress} = req.body
            const CartService = new Service.CartService(email, currentUser, cartItems, total, deliveryMethod, completeAddress)
            const response = await CartService.confirmOrder()
            return res.status(200).json({
                message: response
            })

        } catch (error) {
            return next({
                message: error.message,
                status: error.status
            })
        }
    }
);




module.exports = router

