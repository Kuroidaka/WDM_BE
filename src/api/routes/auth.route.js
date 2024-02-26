import express from 'express'

import authController from "../controller/auth/index.js"
import verifyToken from "../middleware/validate_token.js"

export default (dependencies) => {
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