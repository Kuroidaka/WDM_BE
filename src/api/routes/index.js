const express = require("express")
const foodRouter  = require("./food.route.js")
const lobRouter  = require("./lob.route.js")
const authRouter  = require("./auth.route.js")

const routes = (dependencies) => {
    const router = express.Router()

    const food = foodRouter(dependencies)
    const lob = lobRouter(dependencies)
    const auth = authRouter(dependencies)


    router.use('/food', food)
    router.use('/lob', lob)
    router.use('/auth', auth)


    return router
}

module.exports = routes