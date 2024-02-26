import express from 'express'

import lobController from "../controller/lob/index.js"

export default (dependencies) => {
    const router = express.Router()

    const {
        getLobController,
        importLobController
    } = lobController(dependencies)

    router  
        .route("/get")
        .get(getLobController)

    router  
        .route("/import")
        .post(importLobController)

    return router
}