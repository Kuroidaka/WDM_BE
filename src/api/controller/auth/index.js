const loginController  = require("./login.js")
const registerController  = require("./register.js")
const getUserController  = require("./get_user.js")
const changePasswordController  = require("./change_password.js")
const updateUserController  = require("./update_user.js")

// food controller 
module.exports = (dependencies) => {
    return {
        loginController: loginController(dependencies),
        registerController: registerController(dependencies),
        getUserController: getUserController(dependencies),
        changePasswordController: changePasswordController(dependencies),
        updateUserController: updateUserController(dependencies),
    }
}