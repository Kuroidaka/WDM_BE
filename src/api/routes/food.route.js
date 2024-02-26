import express from 'express'

import foodController from "../controller/food/index.js"

export default (dependencies) => {
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