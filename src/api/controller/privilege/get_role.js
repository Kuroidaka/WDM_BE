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
        const role = await DB.role.findMany(roleQuery)


        return res.status(200).json(role);
      } catch (error) {
          console.error('Error getting privilege:', error);
          return res.status(500).send({ message: 'Error getting privilege:r' });
      }
  }
}


