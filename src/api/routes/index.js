const express = require("express")
const foodRouter  = require("./food.route.js")
const lobRouter  = require("./lob.route.js")
const authRouter  = require("./auth.route.js")
import express from "express"
import foodRouter from "./food.route.js"
import lobRouter from "./lob.route.js"
import authRouter from "./auth.route.js"
import serviceRoute from "./service.route.js"

const routes = (dependencies) => {
    const router = express.Router()

    const food = foodRouter(dependencies)
    const lob = lobRouter(dependencies)
    const auth = authRouter(dependencies)
    const service = serviceRoute(dependencies)


    router.use('/food', food)
    router.use('/lob', lob)
    router.use('/auth', auth)
    router.use('/service', service)


    return router
}

module.exports = routes