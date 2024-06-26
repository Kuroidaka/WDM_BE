const getLobTypeController  = require("./get_lob_type.js")
const getLobController  = require("./get_lob.js")
const importLobController  = require("./import_lob.js")
const importLobTypeController  = require("./import_lob_type.js")

const updateLobController = require("./update_lob.js")
const deleteLobController = require("./delete_lob.js")

const updateLobTypeController = require("./update_lob_type.js")
const deleteLobTypeController = require("./delete_lob_type.js")


module.exports = (dependencies) => {
    return {
        getLobController: getLobController(dependencies),
        getLobTypeController: getLobTypeController(dependencies),
        importLobController: importLobController(dependencies),
        importLobTypeController: importLobTypeController(dependencies),
        updateLobController: updateLobController(dependencies),
        deleteLobController: deleteLobController(dependencies),
        updateLobTypeController: updateLobTypeController(dependencies),
        deleteLobTypeController: deleteLobTypeController(dependencies)


    }
}