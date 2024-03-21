const express = require('express');
const serviceController = require("../controller/service/index.js");

module.exports = (dependencies) => {
    const router = express.Router();

    const {
        getServiceController,
        importServiceController,
        updateServiceController,
        deleteServiceController
    } = serviceController(dependencies);

    router  
        .route("/get")
        .get(getServiceController);

    router  
        .route("/import")
        .post(importServiceController);
    
    router
        .route("/update")
        .put(updateServiceController);

    router
        .route("/delete")
        .delete(deleteServiceController);

    return router;
};
