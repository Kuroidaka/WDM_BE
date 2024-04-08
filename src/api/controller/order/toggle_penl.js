const { calcPenalty } = require("../../../utils/utils")


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
        
        let totalPrice = 0
        let extraFee = 0
        let wedding = await getOrder(dependencies).execute({id: weddingId})
        wedding = wedding.data[0]

        let currentState = wedding['is_penalty_mode']


        let order = await DB.wedding.findUnique({
          where: {
              id: weddingId
          },
          include: {
            Bill: true,
          }
        })
        
        bill = order.Bill[0]
        totalPrice = bill.total_price
        if(!currentState) {
          const penalData = calcPenalty(order.wedding_date, new Date(), totalPrice)
          if(penalData.isPenal) {
            totalPrice = penalData.extraFee + totalPrice
            extraFee = penalData.extraFee
          }
        }

        const result = await DB.wedding.update({
          where: {
              id: weddingId
          },
          data: {
              "is_penalty_mode": !currentState
          }
        })

        const finalResult = {
          is_penalty_mode : result['is_penalty_mode'],
          total: totalPrice,
          extraFee
        }

        return res.status(200).json(finalResult);
      } catch (error) {
          console.error('Error placing wedding order:', error);
          return res.status(500).send({ message: 'Failed to place wedding order' });
      }
  }
}


