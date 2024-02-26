import getLobController from "./get_lob.js"
import importLobController from "./import_lob.js"

// food controller 
export default (dependencies) => {
    return {
        getLobController: getLobController(dependencies),
        importLobController: importLobController(dependencies)

    }
}