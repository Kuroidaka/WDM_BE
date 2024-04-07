const express  = require('express')

const revenueController  = require("../controller/revenue")

module.exports = (dependencies) => {
    const router = express.Router()

    const {
        getRevenueController,
        getMonthRevenueController

    } = revenueController(dependencies)

    router  
        .route("/get_total")
        .get(getRevenueController)

    router  
        .route("/get_month")
        .get(getMonthRevenueController)

    return router
}