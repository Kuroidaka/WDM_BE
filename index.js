import dotenv from 'dotenv';

const init  = require("./src/app.js")

// Load biến môi trường từ tệp .env
dotenv.config();

const { start } = init

start()