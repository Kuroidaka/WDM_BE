const express  = require( 'express')

const lobController  = require( "../controller/lob/index.js")

module.exports = (dependencies) => {
    const router = express.Router()

    const {
        getLobController,
        importLobController,
        updateLobController,
        deleteLobController,
        getLobTypeController,
        importLobTypeController
    } = lobController(dependencies)

    router  
        .route("/get")
        .get(getLobController)

    router  
        .route("/get_type")
        .get(getLobTypeController)

    router  
        .route("/import")
        .post(importLobController)

    router  
        .route("/import_type")
        .post(importLobTypeController)

    router  
        .route("/update")
        .put(updateLobController)

    router  
        .route("/delete")
        .delete(deleteLobController)
    
    return router
}