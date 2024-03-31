const getFoodController  = require("./get_food.js")
const importFoodController  = require("./import_food.js")
const deleteFoodController  = require("./delete_food.js")
const updateFoodController  = require("./update_food.js")
// food controller 
module.exports = (dependencies) => {
    return {
        getFoodController: getFoodController(dependencies),
        importFoodController: importFoodController(dependencies),
        deleteFoodController: deleteFoodController(dependencies),
        updateFoodController: updateFoodController(dependencies)
    }
}