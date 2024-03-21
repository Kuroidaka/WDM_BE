const express = require('express')

const customerController = require( "../controller/customer")

module.exports = (dependencies) => {
    const router = express.Router()

    const {
        createCustomerController

    } = customerController(dependencies)

    router  
        .route("/create")
        .post(createCustomerController)

    return router
}