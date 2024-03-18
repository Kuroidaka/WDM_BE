export default (dependencies) => {
    const { DB } = dependencies;

    if (!DB) {
        throw new Error("DB should be exist in dependencies");
    }

    const execute = async () => {
        try {
            const service = await DB.service.findMany({});
            
            return {
                data: service
            };
        } catch (error) {
            return { 
                error: error
            }
        }
    }

    return { execute };
};
