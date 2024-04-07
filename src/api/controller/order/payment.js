module.exports = (dependencies) => {
    const {
      useCases: {
        lob: { importLob },
        customer: { findCustomer, createCustomer },
        wedding: { createWedding, getWedding },
        order: { orderFood },
        food: { getFood, updateInventory },
        service: { getService }
      },
    } = dependencies

    return async (req, res) => {  
      const {
          groom,
          bride,
          weddingDate,
          shift,
          lobbyId,
          phone,
          deposit,
          tableCount,
          note,
          foods,
          services,
          minTablePrice,
          weddingId,
          currentPrice
      } = req.body;

      try {
        
        

        return res.status(400).json({msg: 'Which step do you want [food, wedding]?'});
      } catch (error) {
          console.error('Error placing wedding order:', error);
          return res.status(500).send({ message: 'Failed to place wedding order' });
      }
  }
}


