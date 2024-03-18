const express = require('express')

const foodController = require( "../controller/food")

module.exports = (dependencies) => {
    const router = express.Router()

    const {
        getFoodController,
        importFoodController

    } = foodController(dependencies)

    router  
        .route("/get")
        .get(getFoodController)

    router  
        .route("/import")
        .post(importFoodController)

    return router
}