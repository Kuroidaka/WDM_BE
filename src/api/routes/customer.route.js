const express = require('express')

const customerController = require( "../controller/customer")

module.exports = (dependencies) => {
    const router = express.Router()

    const {
        createCustomerController,
        getCustomerController
    } = customerController(dependencies)

    router  
        .route("/create")
        .post(createCustomerController)

    router  
        .route("/get")
        .get(getCustomerController)

    return router
}