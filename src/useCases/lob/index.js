const getLob  = require("./get_lob.js")
const getLobType  = require("./get_lob_type.js")
const importLob  = require("./import_lob.js")
const importLobType  = require("./import_lob_type.js")

const updateLob = require("./update_lob.js")
const deleteLob = require("./delete_lob.js")
const updateLobType = require("./update_lob_type.js")
const deleteLobType = require("./delete_lob_type.js")


const lob = {
    getLob,
    importLob,
    updateLob,
    deleteLob,
    getLobType,
    importLobType,
    updateLobType,
    deleteLobType

}

module.exports = lob