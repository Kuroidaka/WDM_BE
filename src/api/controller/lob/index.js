const getLobController  = require("./get_lob.js")
const constLobController  = require("./import_lob.js")

// food controller 
module.exports = (dependencies) => {
    return {
        getLobController: getLobController(dependencies),
        constLobController: constLobController(dependencies)

    }
}