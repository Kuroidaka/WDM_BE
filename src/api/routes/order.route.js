const express  = require( 'express')

const orderController  = require( "../controller/order")

module.exports = (dependencies) => {
    const router = express.Router()

    const {
        placeOrderController
    } = orderController(dependencies)

    // router  
    //     .route("/get")
    //     .get(getLobController)

    router  
        .route("/place")
        .post(placeOrderController)

    return router
}