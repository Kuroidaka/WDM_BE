const { nanoid } = require("nanoid");

module.exports = (dependencies) => {
    const { 
        DB,
        useCases: {
            food: { getFood },
          },
    } = dependencies;

    if (!DB) {
        throw new Error("DB should be exist in dependencies");
    }

    const execute = async ({
        food,
        weddingId
    }) => {
        try {

            let foodData = await getFood(dependencies).execute({id: food.id })
            foodData = foodData.data[0]

            await DB.FoodOrder.create({
                data: {
                    id: nanoid(),
                    "food_name": foodData.name,
                    "food_price": foodData.price,
                    "wedding_id": weddingId,
                    count: food.count
                }
            });


        } catch (error) {
            console.log(error)
            return {
                error: error
            }
        }
        
    }

    return { execute };
};
