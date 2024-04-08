module.exports = (dependencies) => {
    const {
      DB,
      useCases: {
        lob: { importLob },
        customer: { findCustomer, createCustomer },
        wedding: { createWedding, getWedding },
        order: { getOrder },
        food: { getFood, updateInventory },
        service: { getService }
      },
    } = dependencies

    return async (req, res) => {  
      const {
        id=""
      } = req.body;

      try {

        const roleQuery = {}

        if(id !== ""){
          roleQuery.where ={
            id
          }
        }

        roleQuery.include = {
          RolePermission: {
            include: {
              Permission: true
            }
          }
        }
        let roleList = await DB.role.findMany(roleQuery)

        roleList = roleList.map(role => {
          role.RolePermission = role.RolePermission.map(permission => {

            const {Permission, ...needData} = permission
            return {
              ...needData,
              "name": permission.Permission.name,
              "description": permission.Permission.description,
              "page": permission.Permission.page,

            }
          })

          return role
        })

        return res.status(200).json(roleList);
      } catch (error) {
          console.error('Error getting privilege:', error);
          return res.status(500).send({ message: 'Error getting privilege:r' });
      }
  }
}


