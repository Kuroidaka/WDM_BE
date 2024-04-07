const { getStartAndEndOfDay } = require("../../utils/utils")

module.exports = (dependencies) => {
    const { DB } = dependencies;

    if (!DB) {
        throw new Error("DB should be exist in dependencies");
    }

    const execute = async ({date, lobTypeId}) => {
        try {

            const queryObj = {
                include : {
                    Wedding: true
                }
            }

            if(lobTypeId) {
                queryObj.where = {
                    "lob_type_id": lobTypeId
                }
            }

            if(date) {
                const { startOfDay, endOfDay } = getStartAndEndOfDay(date)

                console.log(startOfDay, endOfDay)
                queryObj.include = {
                    Wedding: {
                        where: {
                            wedding_date: {
                                gte: startOfDay.toISOString(),
                                lte: endOfDay.toISOString(),
                            }
                        }
                    }
                }
            }

            const lobby = await DB.lobby.findMany(queryObj);
            
            return {
                data: lobby
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
