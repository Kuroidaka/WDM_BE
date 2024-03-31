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

    const checkInventory = async ({serviceData, service }) => {

        let inventory = serviceData.inventory - service.count
        if(inventory < 0) {
            return {
                msg: `${serviceData.name} remains: ${serviceData.inventory}, not enough to fulfill the order.`
            }
        }   
    }

    const execute = async ({
        service,
        weddingId
    }) => {
        try {

            let serviceData = await getService(dependencies).execute({ id: service.id })
            serviceData = serviceData.data[0]

            const inventory = await checkInventory({serviceData, service})
            if(inventory?.msg) {
                return {
                    error: true,
                    msg: inventory.msg
                }
            }

            await DB.ServiceOrder.create({
                data: {
                    id: nanoid(),
                    "service_id": serviceData.id,
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
