module.exports = (dependencies) => {
    const {
        DB,
      useCases: {
      },
    } = dependencies
  
    return async (req, res) => {
      try {
        const { 
            userID,
            roleID
        } = req.body
  
        // check role existed from database
        const roleExistCheck = await DB.role.findUnique({
            where: {
                id: roleID
            }
        })

        if(!roleExistCheck) {
            return res.status(404).json({ msg: "role is not exist" })
        }

        // check user id have the role id
        const userRoleCheck = await DB.UserRole.findMany({
            where: {
                AND: [
                    {
                        user_id: userID,
                    },
                    {
                        role_id: roleID
                    }
                ]   
            }
        })

        if(userRoleCheck.length > 0) {
            return res.status(409).json({ msg: `user id: ${userID} already have role: ${roleID}` })
        }

        // check user id have any role
        const userCheck = await DB.UserRole.findMany({
            where: {
                user_id: userID
            }
        })
        
        let userRole
        if(userCheck.length > 0) {
            userRole = await DB.UserRole.updateMany({
                where: {
                    user_id: userID,
                },
                data: {
                    role_id: roleID
                }
            })
        }
        else{
            userRole = await DB.UserRole.create({
                data: {
                    user_id: userID,
                    role_id: roleID
                }
            })
        }
        


        return res.status(200).json({ data: userRole })
      } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error })
      }
    }
  }
  