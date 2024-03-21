const createCustomerController  = require("./create")

// food controller 
module.exports = (dependencies) => {
    return {
        createCustomerController: createCustomerController(dependencies)

    }
}