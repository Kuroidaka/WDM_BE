import express from "express"
import foodRouter from "./food.route.js"
import lobRouter from "./lob.route.js"
import authRouter from "./auth.route.js"

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

export default routes