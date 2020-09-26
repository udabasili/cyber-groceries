const express = require('express');
const router = express.Router()
const Service = require('../../services/');

router.get("/all-users", async (req, res, next) =>{
    try {
        const allUsers = await Service.AdminService.getAllUsers()
        return res.status(200).json({
        message:allUsers
        })
    } catch (error) {
        return next({
            message: error.message,
            status: 500
        })
    }
})

router.put("/edit-user-email/:uid", async (req, res, next) => {
    try {
        const userId =  req.params.uid
        const allUsers = await Service.AdminService.editUserEmail(req.body.email, userId)
        return res.status(200).json({
            message: allUsers
        })
    } catch (error) {
        return next({
            message: error.message,
            status: 500
        })
    }
})

router.put("/update/:uid", async (req, res, next) => {
    try {
        const userId = req.params.uid
        const allUsers = await Service.AdminService.updateUserById(userId, req.body)
        return res.status(200).json({
            message: allUsers
        })
    } catch (error) {
        return next({
            message: error.message,
            status: 500
        })
    }
})

router.delete("/delete/:uid", async (req, res, next) => {
    try {
        const userId = req.params.uid
        const allUsers = await Service.AdminService.deleteUserById(userId)
        return res.status(200).json({
            message: allUsers
        })
    } catch (error) {
        return next({
            message: error.message,
            status: 500
        })
    }
})

router.get("/disable/:uid", async (req, res, next) => {
    try {
        const userId = req.params.uid
        const allUsers = await Service.AdminService.disableUserById(userId)
        return res.status(200).json({
            message: allUsers
        })
    } catch (error) {
        return next({
            message: error.message,
            status: 500
        })
    }
})


router.get("/enable/:uid", async (req, res, next) => {
    try {
        const userId = req.params.uid
        const allUsers = await Service.AdminService.disableUserById(userId)
        return res.status(200).json({
            message: allUsers
        })
    } catch (error) {
        return next({
            message: error.message,
            status: 500
        })
    }
})
router.get("/get-total-cost", async (req, res, next) => {
    try {
        const transactions = await Service.AdminService.getTotalPurchases()
        return res.status(200).json({
            message: transactions
        })
    } catch (error) {
        return next({
            message: error.message,
            status: 500
        })
    }
})

router.get("/get-user-order/:userId", async (req, res, next) => {
    try {
        const userId = req.params.userId
        const AdminService = new Service.AdminService()
        const orders = await AdminService.getUserOrderById(userId)
        return res.status(200).json({
            message: orders
        })
    } catch (error) {
        return next({
            message: error.message,
            status: 500
        })
    }
})

router.post("/set-user-orders/:userId", async (req, res, next) => {
    try {
        const userId = req.params.userId
        const order = req.body
        const AdminService = new Service.AdminService()
        const orders = await AdminService.setOrderById(userId, order)
        return res.status(200).json({
            message: orders
        })
    } catch (error) {
        return next({
            message: error.message,
            status: 500
        })
    }
})

router.get("/get-user-chart-data", async (req, res, next) => {
    try {
        const chartData = await Service.AdminService.getUserChartData()
        return res.status(200).json({
            message: chartData
        })
    } catch (error) {
        return next({
            message: error.message,
            status: 500
        })
    }
})

router.get("/get-users-orders", async (req, res, next) => {
    try {
        const AdminService = new Service.AdminService()
        const orders = await AdminService.getAllOrders()
        return res.status(200).json({
            message: orders
        })
    } catch (error) {
        return next({
            message: error.message,
            status: 500
        })
    }
})
module.exports = router