module.exports = (dependencies) => {
    const { DB } = dependencies;

    if (!DB) {
        throw new Error("DB should be exist in dependencies");
    }

    const execute = async ({
        id,
        name,
        price,
        status,
        is_drink,
        inventory
    }) => {
        try {
            const existingFood = await DB.food.findUnique({
                where: { id: id }
            });

            // nếu không tìm thấy bản ghi
            if (!existingFood) {
                throw new Error("Food not found");
            }

            // Cập nhật bản ghi nếu tìm thấy
            const updatedFood = await DB.food.update({
                where: { id: id },
                data: {
                    name: name,
                    price: Number(price),
                    status: status,
                    is_drink: is_drink,
                    inventory: inventory
                }
            });

            return {
                data: updatedFood
            };
        } catch (error) {
            console.log(error);
            return {
                error: error.message || "An error occurred while updating the food"
            };
        }
    };

    return { execute };
};
