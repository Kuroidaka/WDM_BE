import express from 'express'

import serviceController from "../controller/service/index.js"

export default (dependencies) => {
    const router = express.Router()

    const {
        getServiceController,
        importServiceController,
        updateServiceController

    } = serviceController(dependencies)

    router  
        .route("/get")
        .get(getServiceController)

    router  
        .route("/import")
        .post(importServiceController)
    
    router
        .route("/update")
        .post(updateServiceController)

    return router
}