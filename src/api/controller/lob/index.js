const getLobTypeController  = require("./get_lob_type.js")
const getLobController  = require("./get_lob.js")
const importLobController  = require("./import_lob.js")
const importLobTypeController  = require("./import_lob_type.js")

// food controller 
module.exports = (dependencies) => {
    return {
        getLobController: getLobController(dependencies),
        getLobTypeController: getLobTypeController(dependencies),
        importLobController: importLobController(dependencies),
        importLobTypeController: importLobTypeController(dependencies),

    }
}