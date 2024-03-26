const { nanoid } = require('nanoid')

module.exports = (dependencies) => {
    const { DB } = dependencies;

    if (!DB) {
        throw new Error("DB should be exist in dependencies");
    }

    const execute = async ({
        groom,
        bride,
        weddingDate,
        shift,
        lobbyId,
        deposit,
        tableCount,
        note,
        minTablePrice,
        customerId
    }) => {
        try {
            const wedding = await DB.wedding.create({
                data : {
                    "id": nanoid(),
                    groom,
                    bride,
                    "wedding_date": new Date(weddingDate),
                    shift,
                    "lobby_id": lobbyId,
                    "customer_id": customerId,
                    deposit,
                    "table_count": tableCount,
                    note,
                    "min_table_price": minTablePrice
                }
            });
            
            return {
                data: wedding.id
             };
            
        } catch (error) {
            console.log(error)
            return {
                error: error
            }
        }
    }

    return { execute };
};