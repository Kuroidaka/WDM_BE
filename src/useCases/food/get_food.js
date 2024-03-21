module.exports = (dependencies) => {
    const { DB } = dependencies;

    if (!DB) {
        throw new Error("DB should be exist in dependencies");
    }

    const execute = async ({
        id=""
    }) => {
        try {
            let foods
            console.log(id)
            if(id !== "") { 
                let food = await DB.food.findUnique({
                    where: {
                        id
                    }
                });
                foods = [food]
            }
            else { 
                foods = await DB.food.findMany({});
            }
            
            return {
                data: foods
            };
        } catch (error) {
            console.log(error, "DB:GET_FOOD:ERROR")
            return { 
                error: error
            }
        }
    }

    return { execute };
};
