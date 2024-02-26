export default (dependencies) => {
    const { DB } = dependencies;

    if (!DB) {
        throw new Error("DB should be exist in dependencies");
    }

    const execute = async () => {
        try {
            const lobby = await DB.lobby.findMany({});
            
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
