const loginController  = require("./login.js")
const registerController  = require("./register.js")

// food controller 
module.exports = (dependencies) => {
    return {
        loginController: loginController(dependencies),
        registerController: registerController(dependencies),
    }
}