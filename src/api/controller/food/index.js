import getFoodController from "./get_food.js"
import importFoodController from "./import_food.js"

// food controller 
export default (dependencies) => {
    return {
        getFoodController: getFoodController(dependencies),
        importFoodController: importFoodController(dependencies)

    }
}