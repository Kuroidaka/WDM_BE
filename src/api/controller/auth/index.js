const loginController  = require("./login.js")
const registerController  = require("./register.js")
const getUserController  = require("./get_user.js")

// food controller 
module.exports = (dependencies) => {
    return {
        loginController: loginController(dependencies),
        registerController: registerController(dependencies),
        getUserController: getUserController(dependencies),
    }
}