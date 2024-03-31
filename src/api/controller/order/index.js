const placeOrderController = require("./place")
const getOrderController = require("./get_order")

// food controller 
module.exports = (dependencies) => {
    return {
        placeOrderController: placeOrderController(dependencies),
        getOrderController: getOrderController(dependencies)
    }
}