export default (dependencies) => {
    const { DB } = dependencies;

    if (!DB) {
        throw new Error("DB should be exist in dependencies");
    }

    const execute = async () => {
        const Food = await DB.food.findMany({});
        
        return Food;
    }

    return { execute };
};
