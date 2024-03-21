const placeOrderController  = require("./place")

// food controller 
module.exports = (dependencies) => {
    return {
        placeOrderController: placeOrderController(dependencies)

    }
}