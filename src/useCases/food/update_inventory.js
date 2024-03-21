const { nanoid } = require('nanoid')

module.exports = (dependencies) => {
    const { DB } = dependencies;

    if (!DB) {
        throw new Error("DB should be exist in dependencies");
    }

    const execute = async ({
        id,
        count
    }) => {
        try {
            const Food = await DB.food.update({
                where: {
                    id: id,
                },
                data: {
                    inventory: count,
                },
            });
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
