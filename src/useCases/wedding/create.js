const { nanoid } = require('nanoid')
const DB = require("../../config/database")


module.exports = (dependencies) => {
    const { DB } = dependencies;

    if (!DB) {
        throw new Error("DB should be exist in dependencies");
    }


    const getDeposit = async ({ id }) => {

        const weddingWithLobType = await DB.lobby.findUnique({
            where: {
                id: id,
            },
            include: {
                LobType: true
            },
        });
        return weddingWithLobType.LobType["deposit_percent"]
    }

    const execute = async ({
        groom,
        bride,
        weddingDate,
        shift,
        lobbyId,
        tableCount,
        note,
        customerId
    }) => {
        try {

            // const deposit = await getDeposit({id: lobbyId})
            // if(!deposit) return {
            //     error: "missing deposit default from lobby"
            // } 

            const wedding = await DB.wedding.create({
                data : {
                    "id": nanoid(),
                    groom,
                    bride,
                    "wedding_date": new Date(weddingDate),
                    shift,
                    "lobby_id": lobbyId,
                    "customer_id": customerId,
                    "table_count": tableCount,
                    note,
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