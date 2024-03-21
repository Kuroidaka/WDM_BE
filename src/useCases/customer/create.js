const { nanoid } = require('nanoid')

module.exports = (dependencies) => {
    const { DB } = dependencies;

    if (!DB) {
        throw new Error("DB should be exist in dependencies");
    }

    const execute = async ({
        name,
        phone
    }) => {
        try {
            const customer = await DB.customer.create({
                data: {
                    "id": nanoid(),
                    "name": name,
                    "phone": phone
                }
            })
            return {
                data: customer
            }
        } catch (error) {
            console.log(error)
            return {
                error: error
            }
        }
        
    }

    return { execute };
};
