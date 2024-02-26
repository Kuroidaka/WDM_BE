export default (dependencies) => {
    const { DB } = dependencies;

    if (!DB) {
        throw new Error("DB should be exist in dependencies");
    }

    const execute = async ({ username }) => {
        try {
            const User = await DB.user.findUnique({
                where: {
                    username
                },
            });
            console.log("user", User)
            return {
                data: User ?? []
            };
            
        } catch (error) {
            console.log(error)
            return {
                error: error
            }
        }
    }

    return { execute };
};