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

    const calculateTotalRevenueByDate =  ({billList}) => {
      const revenueSplitByDate = {}

      billList = billList.forEach((bill) => {

        const date = bill['payment_date'].toISOString().split("T")[0]
        if(revenueSplitByDate[date]) {
          revenueSplitByDate[date].total += bill['deposit_amount']
        } else {
          revenueSplitByDate[date] = {
            total: bill['deposit_amount'],
            record: []
          }
        }
        revenueSplitByDate[date].record.push(bill)
      })

      // console.log(revenueSplitByDate)
      return revenueSplitByDate
    }

    return async (req, res) => {  
      const {
        month,
        year
      } = req.body;

      try {
        let finalData = {}

        // calc payment amount in dates of specific month
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0); 

        const billData = await DB.bill.findMany({
          where: {
            "payment_date": {
              gte: startDate,
              lte: endDate
            },
          }
        })
        let monthRevenue = calculateTotalRevenueByDate({billList: billData})
        
        finalData.monthRevenue = monthRevenue



        return await res.status(200).json(finalData);
      } catch (error) {
          console.error('Failed to get wedding revenue:', error);
          return res.status(500).send({ message: 'Failed to get wedding revenue' });
      }
  }
}


