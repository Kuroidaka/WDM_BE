import getServiceController from "./get_service.js"
import importServiceController from "./import_service.js"
import updateServiceController from "./update_service.js"
import deleteServiceController from "./delete_service.js"

// service controller 
export default (dependencies) => {
    return {
        getServiceController: getServiceController(dependencies),
        importServiceController: importServiceController(dependencies),
        updateServiceController: updateServiceController(dependencies),
        deleteServiceController: deleteServiceController(dependencies)
    }
}