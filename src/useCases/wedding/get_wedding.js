const { nanoid } = require('nanoid')

module.exports = (dependencies) => {
    const { DB } = dependencies;

    if (!DB) {
        throw new Error("DB should be exist in dependencies");
    }

    const execute = async ({ id = "" }) => {
        try {
            let weddings
            if(id !== "") { 
                let wedding = await DB.wedding.findUnique({
                    where: {
                        id
                    },
                    include: {
                        Lobby: {
                            include: {
                                LobType: true
                            }
                        }
                    }
                });
                weddings = [wedding]
            }
            else { 
                weddings = await DB.wedding.findMany({});
            }
            
            return {
                data: weddings
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