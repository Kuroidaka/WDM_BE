module.exports = (dependencies) => {
    const { DB } = dependencies;

    if (!DB) {
        throw new Error("DB should be exist in dependencies");
    }

    const execute = async ({
        id,
        name,
        lobTypeId
    }) => {
        try {
            const existingLob = await DB.lobby.findUnique({
                where: { id: id }
            });

            // nếu không tìm thấy bản ghi
            if (!existingLob) {
                throw new Error("Lob not found");
            }

            // Cập nhật bản ghi nếu tìm thấy
            const updatedLob = await DB.lobby.update({
                where: { id: id },
                data: {
                    name: name,
                    lob_type_id: lobTypeId
                }
            });

            return {
                data: updatedLob
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
