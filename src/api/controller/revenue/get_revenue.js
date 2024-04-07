const { calcPenalty } = require("../../../utils/utils");

module.exports = (dependencies) => {
    const {
      DB,
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

      } = req.body;

      try {
        let finalData = {}
          const weddingData = await DB.wedding.findMany({
            include: {
              Bill: true
            }
          })

          // Number wedding
          const weddingNum = await DB.wedding.count()
          finalData.weddingNum = weddingNum
          
          // Real revenue 
          let realRevenue = weddingData.reduce((total, data) => {
            let totalDeposit = data['Bill'].reduce((total, current)=> {
              return total += current['deposit_amount']
            }, 0)

            return total += totalDeposit
          }, 0)
          finalData.realRevenue = realRevenue

          // Estimate revenue
          let estimateRevenue = weddingData.reduce((total, data) => {
            let estimatePrice = 0
            let weddingDate = data["wedding_date"]
            let totalPrice = data['Bill'][0]['total_price']
            if(data['is_penalty_mode']) {
              const penalData = calcPenalty(weddingDate, new Date(), totalPrice)
              if(penalData.isPenal) {
                estimatePrice = penalData.extraFee + totalPrice
              }
            }
            else {
              estimatePrice = totalPrice
            }

            return total += estimatePrice
          }, 0)
          finalData.estimateRevenue = estimateRevenue
          // finalData.weddingData = weddingData
          // 


        return res.status(200).json(finalData);
      } catch (error) {
          console.error('Error placing wedding order:', error);
          return res.status(500).send({ message: 'Failed to place wedding order' });
      }
  }
}


