const express = require("express")
const foodRouter  = require("./food.route.js")
const lobRouter  = require("./lob.route.js")
const authRouter  = require("./auth.route.js")
const customerRouter  = require("./customer.route.js")
const orderRouter  = require("./order.route.js")
const revenueRouter  = require("./revenue.route.js")
const serviceRouter =  require("./service.route.js")
const privilegeRouter =  require("./privilege.route.js")


const routes = (dependencies) => {
    const router = express.Router()

    const food = foodRouter(dependencies)
    const lob = lobRouter(dependencies)
    const auth = authRouter(dependencies)
    const service = serviceRouter(dependencies)
    const customer = customerRouter(dependencies)
    const order = orderRouter(dependencies)
    const revenue = revenueRouter(dependencies)
    const privilege = privilegeRouter(dependencies)


    router.use('/food', food)
    router.use('/customer', customer)
    router.use('/lob', lob)
    router.use('/auth', auth)
    router.use('/service', service)
    router.use('/order', order)
    router.use('/revenue', revenue)
    router.use('/privilege', privilege)



    return router
}

module.exports = routes