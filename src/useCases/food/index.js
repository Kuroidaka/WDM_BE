const getFood  = require("./get_food.js")
const importFood  = require("./import_food.js")
const updateInventory  = require("./update_inventory.js")
const deleteFood  = require("./delete_food.js")
const updateFood  = require("./update_food.js")
const food = {
    getFood,
    importFood,
    updateInventory,
    deleteFood,
    updateFood
}

module.exports = food