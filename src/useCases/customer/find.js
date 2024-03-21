module.exports = (dependencies) => {
    const { DB } = dependencies;

    if (!DB) {
        throw new Error("DB should be exist in dependencies");
    }

    const execute = async ({
        phone
    }) => {
        try {
            const customer = await DB.customer.findUnique({
              where: {
                phone: phone
              }  
            })
            
            return {
                data: customer
            };
        }
         catch (error) {
            console.log(error, "DB:FIND_CUSTOMER:ERROR")
            return { 
                error: error
            }
        }
    }

    return { execute };
};
