const express = require('express');
const router = express.Router()

const Service = require('../../services/');

router.get(
    "/get-all-products",
    async (req, res, next) => {
        try {
            const ProductService = new Service.ProductService(req.body, req.params.itemId);
            const products = await ProductService.getAllProducts()
            return res.status(200).json({
                status: 200,
                message: products
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