const food  = require("./food/index.js")
const lob  = require("./lob/index.js")
const user  = require("./user/index.js")
const customer  = require("./customer")
const wedding  = require("./wedding")
const order  = require("./order")
const service = require("./service/index.js");

const useCases = {
    food,
    lob,
    user,
    service,
    customer,
    wedding,
    order
}

module.exports = useCases