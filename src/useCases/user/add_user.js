const { nanoid } = require('nanoid')

module.exports = (dependencies) => {
    const { DB } = dependencies;

    if (!DB) {
        throw new Error("DB should be exist in dependencies");
    }

    const execute = async ({
        isAdmin,
        displayName,
        username,
        password
    }) => {
        try {
            const user = await DB.user.create({
                data : {
                    "id": nanoid(),
                    "isAdmin": isAdmin,
                    "display_name": displayName,
                    "username": username,
                    "password": password
                }
            });
            
            return {
                data: user
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