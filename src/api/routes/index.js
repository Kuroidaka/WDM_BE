import express from "express"
import foodRouter from "./food.route.js"

const routes = (dependencies) => {
    const router = express.Router()

    const food = foodRouter(dependencies)


    router.use('/food', food)

    return router
}

export default routes