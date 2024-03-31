
module.exports = (dependencies) => {
    const {
        DB,
      useCases: {
        lob: { importLob },
        customer: { findCustomer, createCustomer },
        wedding: { createWedding, getWedding },
        order: { orderFood, getOrder },
        food: { getFood, updateInventory },
        service: { getService }
      },
    } = dependencies

    return async (req, res) => {  
      const {
          weddingId
      } = req.body;

      try {
        

        let wedding = await getOrder(dependencies).execute({id: weddingId})
        wedding = wedding.data[0]

        let currentState = wedding['is_penalty_mode']

        const result = await DB.wedding.update({
            where: {
                id: weddingId
            },
            data: {
                "is_penalty_mode": !currentState
            }

        })

        return res.status(200).json(result);
      } catch (error) {
          console.error('Error placing wedding order:', error);
          return res.status(500).send({ message: 'Failed to place wedding order' });
      }
  }
}


