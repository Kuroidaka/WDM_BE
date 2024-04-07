module.exports = (dependencies) => {
    const { DB } = dependencies;

    if (!DB) {
        throw new Error("DB should be exist in dependencies");
    }

    const execute = async ({ id }) => {
        try {
            const existingLobType = await DB.lobType.findUnique({
                where: { id: id }
            });

            // Nếu không tìm thấy lob
            if (!existingLobType) {
                throw new Error("Lobby Type not found");
            }

            await DB.lobType.delete({
                where: { id: id }
            });

            return {
                message: "Lob Type deleted successfully"
            };
        } catch (error) {
            console.log(error);
            return {
                error: error.message || "An error occurred while deleting the lob type"
            };
        }
    };

    return { execute };
};
