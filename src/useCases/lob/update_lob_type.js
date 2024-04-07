module.exports = (dependencies) => {
    const { DB } = dependencies;

    if (!DB) {
        throw new Error("DB should be exist in dependencies");
    }

    const execute = async ({
        id,
        maxTableCount,
        minTablePrice,
        depositPercent,
        typeName
    }) => {
        try {
            const existingLobType = await DB.lobType.findUnique({
                where: { id: id }
            });

            // nếu không tìm thấy bản ghi
            if (!existingLobType) {
                throw new Error("Lob Type not found");
            }

            // Cập nhật bản ghi nếu tìm thấy
            const updatedLobType = await DB.lobType.update({
                where: { id: id },
                data: {
                    max_table_count: Number(maxTableCount),
                    min_table_price: Number(minTablePrice),
                    deposit_percent: Number(depositPercent),
                    type_name: typeName
                }
            });

            return {
                data: updatedLobType
            };
        } catch (error) {
            console.log(error);
            return {
                error: error.message || "An error occurred while updating the food"
            };
        }
    };

    return { execute };
};
