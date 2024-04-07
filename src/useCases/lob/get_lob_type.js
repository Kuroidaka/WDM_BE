module.exports = (dependencies) => {
    const { DB } = dependencies;

    if (!DB) {
        throw new Error("DB should be exist in dependencies");
    }

    const execute = async () => {
        try {
            const lobby = await DB.lobType.findMany({});
            
            return {
                data: lobby
            };
        } catch (error) {
            return { 
                error: error
            }
        }
    }

    return { execute };
};
