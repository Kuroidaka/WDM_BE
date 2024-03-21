const getLobController  = require("./get_lob.js")
const importLobController  = require("./import_lob.js")

// food controller 
module.exports = (dependencies) => {
    return {
        getLobController: getLobController(dependencies),
        importLobController: importLobController(dependencies)

    }
}