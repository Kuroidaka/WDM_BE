import getFoodController from "./get_food_controller.js"

// food controller 
export default (dependencies) => {
    return {
        getFoodController: getFoodController(dependencies),

    }
}