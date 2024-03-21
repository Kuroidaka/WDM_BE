export default (dependencies) => {
    const { DB } = dependencies;

    if (!DB) {
        throw new Error("DB should be exist in dependencies");
    }

    const execute = async ({
        id,
        name,
        price,
        status
    }) => {
        try {
            const existingService = await DB.service.findUnique({
                where: { id: id }
            });

            // nếu không tìm thấy bản ghi
            if (!existingService) {
                throw new Error("Service not found");
            }

            // Cập nhật bản ghi nếu tìm thấy
            const updatedService = await DB.service.update({
                where: { id: id },
                data: {
                    name: name,
                    price: Number(price),
                    status: status
                }
            });

            return {
                data: updatedService
            };
        } catch (error) {
            console.log(error);
            return {
                error: error.message || "An error occurred while updating the service"
            };
        }
    };

    return { execute };
};
