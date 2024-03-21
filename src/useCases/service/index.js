const getService = require("./get_service.js");
const importService = require("./import_service.js");
const updateService = require("./update_service.js");
const deleteService = require("./delete_service.js");

const service = {
    getService,
    importService,
    updateService,
    deleteService
};

module.exports = service;
