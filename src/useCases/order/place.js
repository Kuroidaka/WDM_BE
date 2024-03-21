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
        customerId,
        deposit,
        tableCount,
        note,
    }) => {
        try {
            const Lob = await DB.lobby.create({
                data: {
                    "groom":groom,
                    "bride":bride,
                    "wedding_date":weddingDate,
                    "shift":shift,
                    "lobby_id":lobbyId,
                    "customer_id":customerId,
                    "deposit":deposit,
                    "table_count":tableCount,
                    "note":note
                }
            })
            return {
                data: Lob.id
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
