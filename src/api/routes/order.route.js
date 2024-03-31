const express  = require( 'express')

const orderController  = require( "../controller/order")

module.exports = (dependencies) => {
    const router = express.Router()

    const {
        placeOrderController,
        getOrderController,
        togglePenlOrderController
    } = orderController(dependencies)

    router  
        .route("/get")
        .get(getOrderController)

    router  
        .route("/place")
        .post(placeOrderController)
    
    router  
        .route("/penalty")
        .post(togglePenlOrderController)

    return router
}