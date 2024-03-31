const { nanoid } = require('nanoid')

module.exports = (dependencies) => {
    const { DB } = dependencies;

    if (!DB) {
        throw new Error("DB should be exist in dependencies");
    }

    const execute = async ({
        weddingId,
    }) => {
        try {
            let bill
            if(weddingId) {
                bill = await DB.bill.findMany({
                    where: {
                        "wedding_id": weddingId
                    },
                    orderBy: {
                        "created_at": 'desc'
                    }
                })
            }
            else {
                bill = await DB.bill.findMany()
            }
            return {
                data: bill
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
