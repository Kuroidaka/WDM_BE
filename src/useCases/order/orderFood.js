const { nanoid } = require("nanoid");

module.exports = (dependencies) => {
    const { 
        DB,
        useCases: {
            food: { getFood, updateInventory },
          },
    } = dependencies;

    if (!DB) {
        throw new Error("DB should be exist in dependencies");
    }

    const checkInventory = async ({foodData, food }) => {

        let inventory = foodData.inventory - food.count
        if(inventory < 0) {
            return {
                msg: `${foodData.name} remains: ${foodData.inventory}, not enough to fulfill the order.`
            }
        }   
    }

    const execute = async ({
        food,
        weddingId
    }) => {
        try {

            let foodData = await getFood(dependencies).execute({id: food.id })
            foodData = foodData.data[0]
            console.log("foodData", foodData)

            const inventory = await checkInventory({foodData, food})
            if(inventory?.msg) {
                return {
                    error: true,
                    msg: inventory.msg
                }
            }

            await DB.FoodOrder.create({
                data: {
                    id: nanoid(),
                    "food_id": foodData.id,
                    "food_name": foodData.name,
                    "food_price": foodData.price,
                    "wedding_id": weddingId,
                    count: food.count
                }
            });



        } catch (error) {
            console.log(error)
            return {
                error: error,
            }
        }
        
    }

    return { execute };
};
