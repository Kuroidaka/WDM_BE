const { nanoid } = require("nanoid");

module.exports = (dependencies) => {
    const { 
        DB,
        useCases: {
            service: { getService },
          },
    } = dependencies;

    if (!DB) {
        throw new Error("DB should be exist in dependencies");
    }

    const execute = async ({
        service,
        weddingId
    }) => {
        try {

            let serviceData = await getService(dependencies).execute({ id: service.id })
            serviceData = serviceData.data[0]

            await DB.ServiceOrder.create({
                data: {
                    id: nanoid(),
                    "service_name": serviceData.name,
                    "service_price": serviceData.price,
                    "wedding_id": weddingId,
                    count: service.count
                }
            });


        } catch (error) {
            console.log(error)
            return {
                error: error
            }
        }
        
    }

    return { execute };
};
