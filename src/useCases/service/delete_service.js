module.exports = (dependencies) => {
    const { DB } = dependencies;

    if (!DB) {
        throw new Error("DB should be exist in dependencies");
    }

    const execute = async ({ id }) => {
        try {
            // Kiểm tra xem dịch vụ có tồn tại không
            const existingService = await DB.service.findUnique({
                where: { id: id }
            });

            // Nếu không tìm thấy dịch vụ, ném ra một ngoại lệ
            if (!existingService) {
                throw new Error("Service not found");
            }

            await DB.service.delete({
                where: { id: id }
            });

            return {
                message: "Service deleted successfully"
            };
        } catch (error) {
            console.log(error);
            return {
                error: error.message || "An error occurred while deleting the service"
            };
        }
    };

    return { execute };
};
