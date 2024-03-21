const food  = require("./food/index.js")
const lob  = require("./lob/index.js")
const user  = require("./user/index.js")
const customer  = require("./customer")
const wedding  = require("./wedding")
const order  = require("./order")

const useCases = {
    food,
    lob,
    user,
    customer,
    wedding,
    order
}

module.exports = useCases