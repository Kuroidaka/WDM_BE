import dotenv from 'dotenv';

import init from "./src/app.js"

// Load biến môi trường từ tệp .env
dotenv.config();

const { start } = init

start()