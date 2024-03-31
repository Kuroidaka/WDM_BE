const express = require('express')

const foodController = require( "../controller/food/index.js")

module.exports = (dependencies) => {
    const router = express.Router()

    const {
        getFoodController,
        importFoodController,
        deleteFoodController,
        updateFoodController
    } = foodController(dependencies)

    router  
        .route("/get")
        .get(getFoodController)

    router  
        .route("/import")
        .post(importFoodController)
        
    router  
        .route("/delete")
        .delete(deleteFoodController)

    router  
        .route("/update")
        .put(updateFoodController)

    return router
}