const createCustomerController  = require("./create")
const getCustomerController  = require("./get")

// food controller 
module.exports = (dependencies) => {
    return {
        createCustomerController: createCustomerController(dependencies),
        getCustomerController: getCustomerController(dependencies)
    }
}