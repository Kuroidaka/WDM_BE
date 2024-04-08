const express  = require( 'express')

const roleController  = require( "../controller/privilege")

module.exports = (dependencies) => {
    const router = express.Router()

    const {
        importRoleController,
        getRoleController,
        updateRolePermissionController,
        setRoleUserController
    } = roleController(dependencies)

    router  
        .route("/role/import")
        .post(importRoleController)

    router  
        .route("/role/get")
        .get(getRoleController)

    router  
        .route("/role/update")
        .post(updateRolePermissionController)
        
    router  
        .route("/role/set")
        .post(setRoleUserController)

   

    return router
}