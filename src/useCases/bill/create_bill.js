const { nanoid } = require('nanoid')

module.exports = (dependencies) => {
    const { DB } = dependencies;

    if (!DB) {
        throw new Error("DB should be exist in dependencies");
    }

    const execute = async ({
        weddingId,
        serviceTotalPrice,
        totalPrice,
        depositRequire,
        depositAmount,
    }) => {
        try {
            const bill = await DB.bill.create({
                data: {
                    "id": nanoid(),
                    "wedding_id": weddingId ,
                    "payment_date": new Date() ,
                    "service_total_price": serviceTotalPrice,
                    "total_price": totalPrice,
                    "deposit_require":depositRequire,
                    "deposit_amount": depositAmount
                    
                }
            })
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
