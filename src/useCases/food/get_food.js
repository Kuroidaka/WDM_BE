module.exports = (dependencies) => {
    const { DB } = dependencies;

    if (!DB) {
        throw new Error("DB should be exist in dependencies");
    }

    const execute = async () => {
        try {
            const Food = await DB.food.findMany({});
            
            return {
                data: Food
            };
        } catch (error) {
            console.log(error, "DB:GET_FOOD:ERROR")
            return { 
                error: error
            }
        }
    }

    return { execute };
};
