export default (dependencies) => {
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
            return { 
                error: error
            }
        }
    }

    return { execute };
};
