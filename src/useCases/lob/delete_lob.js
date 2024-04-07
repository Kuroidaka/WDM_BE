module.exports = (dependencies) => {
    const { DB } = dependencies;

    if (!DB) {
        throw new Error("DB should be exist in dependencies");
    }

    const execute = async ({ id }) => {
        try {
            const existingLob = await DB.lobby.findUnique({
                where: { id: id }
            });

            // Nếu không tìm thấy lob
            if (!existingLob) {
                throw new Error("Lobby not found");
            }

            await DB.lobby.delete({
                where: { id: id }
            });

            return {
                message: "Lob deleted successfully"
            };
        } catch (error) {
            console.log(error);
            return {
                error: error.message || "An error occurred while deleting the lob"
            };
        }
    };

    return { execute };
};
