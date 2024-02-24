import express from "express"
import cors from "cors"
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import chalk from "chalk"
import bodyParser from 'body-parser'
import helmet from "helmet";

import routes from "./api/routes/index.js"
import dependencies from "./config/dependencies.js"

const app = express()

const API_PREFIX = "/api/v1"
const PORT = process.env.SERVER_PORT || "8080"

export default {
    start: () => {

        // Middlewares
        app.use(express.json())
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(cors()) 
        app.use(helmet());
        app.use(cookieParser())
        app.use(morgan("dev"))

        // Routes
        app.use(API_PREFIX, routes(dependencies))

        app.listen(PORT, () => {
            console.log("Server :", chalk.blue(PORT), chalk.green("connected"))

            // connect DB
            // const { DB } = dependencies
            // checkDatabaseConnection(DB)
        })
    },
}