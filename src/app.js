
const express = require("express")
const cors = require("cors")
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const chalk = require("chalk")
const bodyParser = require('body-parser')
const helmet = require("helmet")

require("dotenv").config()
// dotenv.config({ path: __dirname + '../.env' })

const routes = require("./api/routes/index.js")
const dependencies = require("./config/dependencies.js")

const app = express()

const API_PREFIX = "/api/v1"
const PORT = process.env.SERVER_PORT || "8080"

module.exports = {
    start: () => {

        // // Middlewares
        app.use(express.json())
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(cors()) 
        app.use(helmet())
        app.use(cookieParser())
        app.use(morgan("dev"))

        // // Routes
        app.use(API_PREFIX, routes(dependencies))

        app.listen(PORT, () => {
            console.log("Server :", chalk.blue(PORT), chalk.green("connected"))

            // connect DB
            // const { DB } = dependencies
            // checkDatabaseConnection(DB)
        })
    },
}