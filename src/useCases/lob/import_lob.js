const { nanoid } = require('nanoid')

module.exports = (dependencies) => {
    const { DB } = dependencies;

    if (!DB) {
        throw new Error("DB should be exist in dependencies");
    }

    const execute = async ({
        name,
        lobTypeId
    }) => {
        try {
            const Lob = await DB.lobby.create({
                data: {
                    "id": nanoid(),
                    "name": name,
                    "lob_type_id": lobTypeId
                }
            })
            return {
                data: Lob
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
