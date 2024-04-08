const importRoleController = require("./import_role")
const getRoleController = require("./get_role")
const updateRolePermissionController = require("./update_role_permission")
const setRoleUserController = require("./setRoleUser")

// food controller 
module.exports = (dependencies) => {
    return {
        importRoleController: importRoleController(dependencies),
        getRoleController: getRoleController(dependencies),
        updateRolePermissionController: updateRolePermissionController(dependencies),
        setRoleUserController: setRoleUserController(dependencies),
    }
}