module.exports = (dependencies) => {
    const { 
        DB, 
        useCases:{
            food: {
                getFood
            }
        } 
    } = dependencies;

    return async (req, res) => {
        
        try {
            const {
                id=""
            } = req.body

            let userList = []
            const queryObject = {}

            if(id !== "") {
                queryObject.where = {
                    id
                }
            }
            queryObject.include = {
                UserRole: {
                    select: {
                    Role: {
                        select: {
                        RolePermission: {
                            select: {
                            Permission: {
                                select: {
                                id: true,
                                name: true,
                                description: true,
                                page: true,
                                created_at: true,
                                updated_at: true,
                                },
                            },
                            },
                        },
                        },
                    },
                    },
                }
            }
            userList = await DB.user.findMany(queryObject)

            userList = userList.map(user => {

                let tempData = user?.UserRole[0]?.Role?.RolePermission.map(permission => {
                    return permission.Permission
                })
                const { UserRole, ...userData } = user 
                userData.PermissionList = tempData || []

                return userData
            })

            return res.status(200).json({ data: userList })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error });
        }
   
    }
}