module.exports = (dependencies) => {
    const { DB } = dependencies;

    if (!DB) {
        throw new Error("DB should be exist in dependencies");
    }

    const execute = async ({ id }) => {
        try {
            // Kiểm tra xem dịch vụ có tồn tại không
            const existingFood = await DB.food.findUnique({
                where: { id: id }
            });

            // Nếu không tìm thấy dịch vụ, ném ra một ngoại lệ
            if (!existingFood) {
                throw new Error("Food not found");
            }

            await DB.food.delete({
                where: { id: id }
            });

            return {
                message: "Food deleted successfully"
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
