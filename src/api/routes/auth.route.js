const express  = require('express')

const authController  = require("../controller/auth/index.js")
const verifyToken  = require("../middleware/validate_token.js")

module.exports = (dependencies) => {
    const router = express.Router()

    const {
        loginController,
        registerController

    } = authController(dependencies)

    router  
        .route("/login")
        .post(loginController)

    router  
        .route("/register")
        .post(verifyToken, registerController)


    return router
}