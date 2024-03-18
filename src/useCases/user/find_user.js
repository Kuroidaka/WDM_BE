module.exports = (dependencies) => {
    const { DB } = dependencies;

    if (!DB) {
        throw new Error("DB should be exist in dependencies");
    }

    const execute = async ({ username }) => {
        try {
            let listUser 

            if(username) { // search by username
                const user = await DB.user.findUnique({
                    where: {
                        username
                    },
                });
                if(user) listUser = [user] 
                else listUser = []
            }
            else {// search all
                listUser = await DB.user.findMany({});
            }
            
            return {
                data: listUser
            };
        }
         catch (error) {
            console.log("___find user usecase error___", error)
            return {
                error: error
            }
        }
    }

    return { execute };
};