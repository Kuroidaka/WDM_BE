export default (dependencies) => {
    const { DB } = dependencies;

    if (!DB) {
        throw new Error("DB should be exist in dependencies");
    }

    const execute = async ({
        name,
        maxTableCount,
        minTablePrice
    }) => {
        try {
            const Lob = await DB.lobby.create({
                data: {
                    "name": name,
                    "max_table_count": Number(maxTableCount),
                    "min_table_price": Number(minTablePrice)
                }
            })
            return {
                data: Lob
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
