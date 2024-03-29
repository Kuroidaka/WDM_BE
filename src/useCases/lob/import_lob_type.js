const { nanoid } = require('nanoid')

module.exports = (dependencies) => {
    const { DB } = dependencies;

    if (!DB) {
        throw new Error("DB should be exist in dependencies");
    }

    const execute = async ({
        maxTableCount,
        minTablePrice,
        depositPercent,
        typeName
    }) => {
        try {
            const LobType = await DB.lobType.create({
                data: {
                    "id": nanoid(),
                    "max_table_count": Number(maxTableCount),
                    "min_table_price": Number(minTablePrice),
                    "deposit_percent": Number(depositPercent),
                    "type_name": typeName
                }
            })
            return {
                data: LobType
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
