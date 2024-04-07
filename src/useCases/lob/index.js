const getLob  = require("./get_lob.js")
const getLobType  = require("./get_lob_type.js")
const importLob  = require("./import_lob.js")
const importLobType  = require("./import_lob_type.js")
const updateLob = require("./update_lob.js")
const deleteLob = require("./delete_lob.js")


const lob = {
    getLob,
    importLob,
    updateLob,
    deleteLob,
    getLobType,
    importLobType
}

module.exports = lob