module.exports = (dependencies) => {
    const {
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
        id="",
        date
      } = req.body;

      try {
        
        let order = await getOrder(dependencies).execute({ id: id, date })
        order = order.data 

        order = order.map(data => {
            if(data.Bill.length > 0) {
                if(data.Bill[0]["remain_amount"] <= 0)
                    return {...data, status: "paid"} 
                return {...data, status: "deposit"} 
            }
            return {...data, status: "pending"} 
        })

        return res.status(200).json(order);
      } catch (error) {
          console.error('Error placing wedding order:', error);
          return res.status(500).send({ message: 'Failed to place wedding order' });
      }
  }
}


