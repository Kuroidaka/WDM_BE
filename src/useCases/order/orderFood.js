module.exports = (dependencies) => {
    const { DB } = dependencies;

    if (!DB) {
        throw new Error("DB should be exist in dependencies");
    }

    const execute = async ({
        food,
        weddingId
    }) => {
        try {
            await DB.FoodOrder.create({
                data: {
                    food_id: food.id,
                    wedding_id: weddingId,
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
