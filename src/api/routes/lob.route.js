const express  = require( 'express')

const lobController  = require( "../controller/lob/index.js")

module.exports = (dependencies) => {
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