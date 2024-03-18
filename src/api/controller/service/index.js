import getServiceController from "./get_service.js"
import importServiceController from "./import_service.js"

// service controller 
export default (dependencies) => {
    return {
        getServiceController: getServiceController(dependencies),
        importServiceController: importServiceController(dependencies)

    }
}