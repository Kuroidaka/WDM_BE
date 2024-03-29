const { nanoid } = require('nanoid')

module.exports = (dependencies) => {
    const { DB } = dependencies;

    if (!DB) {
        throw new Error("DB should be exist in dependencies");
    }

    const execute = async ({
        name,
        price,
        status
    }) => {
        try {
            const Service = await DB.service.create({
                data: {
                    "id": nanoid(),
                    "name": name,
                    "price": Number(price),
                    "status": status
                }
            })
            return {
                data: Service
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
