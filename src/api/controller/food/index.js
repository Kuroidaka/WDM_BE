const getFoodController  = require("./get_food.js")
const importFoodController  = require("./import_food.js")

// food controller 
module.exports = (dependencies) => {
    return {
        getFoodController: getFoodController(dependencies),
        importFoodController: importFoodController(dependencies)

    }
}