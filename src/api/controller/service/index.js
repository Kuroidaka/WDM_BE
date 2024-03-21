const getServiceController = require("./get_service.js");
const importServiceController = require("./import_service.js");
const updateServiceController = require("./update_service.js");
const deleteServiceController = require("./delete_service.js");

// service controller 
module.exports = (dependencies) => {
    return {
        getServiceController: getServiceController(dependencies),
        importServiceController: importServiceController(dependencies),
        updateServiceController: updateServiceController(dependencies),
        deleteServiceController: deleteServiceController(dependencies)
    };
};
