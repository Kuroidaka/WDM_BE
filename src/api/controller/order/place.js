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

    const weddingProcess = async ({  
      groom,
      bride,
      weddingDate,
      shift,
      lobbyId,
      tableCount,
      phone,
      note,
      minTablePrice 
    }) => {
      let customerData
      if(!phone) return res.status(500).json({msg: 'missing phone field'})
      customerData = await findCustomer(dependencies).execute({phone})
      if(!customerData) {
        customerData = await createCustomer(dependencies).execute({
          name: `${groom}/${bride}`,
          phone
        })
      }

      const wedding = await createWedding(dependencies).execute({
        groom,
        bride,
        weddingDate,
        shift,
        lobbyId,
        tableCount,
        note,
        minTablePrice,
        customerId: customerData.data.id
      })

      return { 
        weddingId: wedding.data,
        customerId: customerData.data.id
       }

    }

    const foodOrderProcess = async ({
        foods,
        tableCount,
        weddingId,
        totalPrice
    }) => {
      // Customer data
      for (const food of foods) {
        await orderFood(dependencies).execute({
          food,
          weddingId: weddingId
        })

        let foodData = await getFood(dependencies).execute({id: food.id})
        foodData = foodData.data[0]

        let inventory = foodData.inventory - food.count*tableCount
        if(inventory < 0) {
          console.log("out of stock")
          return res.status(500).json({msg: `${foodData.name} is out of stock`})
        }          
        console.log(foodData.price )
        totalPrice += foodData.price * tableCount * food.count
      }
      for (const food of foods) {
        let foodData = await getFood(dependencies).execute({id: food.id})
        foodData = foodData.data[0]

        updateInventory(dependencies).execute({
          id: food.id,
          count: foodData.inventory - food.count*tableCount
        })
      }

      return {
        totalPrice
      }
    }

    const serviceOrderProcess = async ({ 
      services,
      totalPrice
    }) => {
      for (const service of services) {
        let serviceData = await getService(dependencies).execute({
          id: service.id
        })
        serviceData = serviceData.data[0]

        totalPrice += serviceData.price

      }

      return {
        price: totalPrice
      }
    }

    return async (req, res) => {  
      const {
          groom,
          bride,
          weddingDate,
          shift,
          lobbyId,
          phone,
          tableCount,
          note,
          foods,
          services,
          minTablePrice,
          weddingId,
          currentPrice
      } = req.body;

      try {
        
        if(req.query?.step === 'wedding') {
          const result = await weddingProcess({          
            groom,
            bride,
            weddingDate,
            shift,
            lobbyId,
            phone,
            tableCount,
            note,
            minTablePrice
          })
          return res.status(200).json({ data: result });
        }
        else if(req.query?.step === 'food'){
          let totalPrice = 0
          console.log(req.query?.step)
          const result = await foodOrderProcess({
            foods,
            tableCount,
            weddingId,
            totalPrice
          })
          return res.status(200).json({ data: result });
        }

        else if(req.query?.step === 'service'){
          let totalPrice = 0
          console.log(req.query?.step)
          const serviceData = await serviceOrderProcess({
            services,
            totalPrice
          })

          const dataWeeding = await getWedding(dependencies).execute({id: weddingId })

          return res.status(200).json({ 
            totalPrice: serviceData.price+currentPrice,
            service: serviceData,
            weddingData: dataWeeding 
          });
        }


        return res.status(400).json({msg: 'Which step do you want [food, wedding]?'});
      } catch (error) {
          console.error('Error placing wedding order:', error);
          return res.status(500).send({ message: 'Failed to place wedding order' });
      }
  }
}


