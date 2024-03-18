import express from 'express'

import serviceController from "../controller/service/index.js"

export default (dependencies) => {
    const router = express.Router()

    const {
        getServiceController,
        importServiceController

    } = serviceController(dependencies)

    router  
        .route("/get")
        .get(getServiceController)

    router  
        .route("/import")
        .post(importServiceController)

    return router
}