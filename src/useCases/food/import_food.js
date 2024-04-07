const { nanoid } = require('nanoid')

module.exports = (dependencies) => {
    const { DB } = dependencies;

    if (!DB) {
        throw new Error("DB should be exist in dependencies");
    }

    const execute = async ({
        name,
        price,
        status,
        is_drink,
        inventory
    }) => {
        try {
            const Food = await DB.food.create({
                data: {
                    "name": name,
                    "price": Number(price),
                    "status": status,
                    "is_drink": is_drink,
                    "inventory": inventory
                }
            })
            return {
                data: Food
            }
        } catch (error) {
            console.log(error)
            return {
                error: error
            }
        }
        
    }

    return { execute };
};
