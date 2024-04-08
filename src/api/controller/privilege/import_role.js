module.exports = (dependencies) => {
    const {
        DB,
      useCases: {
      },
    } = dependencies
  
    return async (req, res) => {
      try {
        const { 
            name,
            permissionList
        } = req.body
  
        // check role existed from database

        const check = await DB.role.findUnique({
            where: {
                name
            }
        })

        if(check) {
            return res.status(409).json({ msg: "role name existed" })
        }
        
        const role = await DB.role.create({
            data: {
                name
            }
        })

        if(permissionList) {
            if(permissionList.length > 0) {
                const promiseList = []
                for (let permission of permissionList) {
                    const process = DB.RolePermission.create({
                        data: {
                            role_id: role.id,
                            permission_id: permission.id
                        }
                    })

                    promiseList.push(process)
                }

                await Promise.all(promiseList)
            }
        }


        return res.status(200).json({ msg: "success" })
      } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error })
      }
    }
  }
  