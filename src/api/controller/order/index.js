const placeOrderController = require("./place")
const getOrderController = require("./get_order")
const togglePenlOrderController = require("./toggle_penl")

// food controller 
module.exports = (dependencies) => {
    return {
        placeOrderController: placeOrderController(dependencies),
        getOrderController: getOrderController(dependencies),
        togglePenlOrderController: togglePenlOrderController(dependencies)
    }
}