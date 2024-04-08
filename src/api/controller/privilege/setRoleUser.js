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
        
        const userRole = await DB.UserRole.create({
            data: {
                user_id: userID,
                role_id: roleID
            }
        })


        return res.status(200).json({ data: userRole })
      } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error })
      }
    }
  }
  