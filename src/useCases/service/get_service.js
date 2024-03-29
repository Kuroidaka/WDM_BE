module.exports = (dependencies) => {
    const { DB } = dependencies;

    if (!DB) {
        throw new Error("DB should be exist in dependencies");
    }

    const execute = async ({id = ""}) => {

        let services
        if(id !== "") { 
            let service = await DB.service.findUnique({
                where: {
                    id
                }
            });
            services = [service]
        }
        else { 
            services = await DB.service.findMany({});
        }
        
        return {
            data: services
        };

    }

    return { execute };
};
