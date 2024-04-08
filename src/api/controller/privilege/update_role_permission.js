module.exports = (dependencies) => {
    const {
        DB,
      useCases: {
      },
    } = dependencies
  
    return async (req, res) => {
      try {
        const { 
            roleID,
            permissionID
        } = req.body
  
        // check role existed from database

        const roleData = await DB.role.findUnique({
            where: {
                id: roleID
            }
        })

        if(!roleData) {
            return res.status(404).json({ msg: "role is not existed" })
        }

        // check roleID have permissionID
        const rolePermissionCheck = await DB.RolePermission.findMany({
          where: {
            AND: [
              {
                role_id: roleID,
              },
              {
                permission_id: permissionID
              }
            ]
          }
        })

        if(rolePermissionCheck.length > 0) {
          return res.status(409).json({ msg: `Role ID: ${roleID} already have permission: ${permissionID}` })
        }

        const RolePermission = await DB.RolePermission.create({
            data: {
                role_id: roleID,
                permission_id: permissionID
            }
        })


        return res.status(200).json({ data: RolePermission })
      } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error })
      }
    }
  }
  