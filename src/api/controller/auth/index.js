import loginController from "./login.js"
import registerController from "./register.js"

// food controller 
export default (dependencies) => {
    return {
        loginController: loginController(dependencies),
        registerController: registerController(dependencies),
    }
}