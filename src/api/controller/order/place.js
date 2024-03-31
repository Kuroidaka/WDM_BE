const orderService = require("../../../useCases/order/orderService")

module.exports = (dependencies) => {
    const {
      DB,
      useCases: {
        lob: { importLob },
        customer: { findCustomer, createCustomer },
        wedding: { createWedding, getWedding },
        order: { orderFood, orderService },
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
      if(!customerData.data) {
        customerData = await createCustomer(dependencies).execute({
          name: `${groom}/${bride}`,
          phone
        })
      }
      console.log(customerData)

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

    // const modifyInventory = async ({foodData, food, tableCount }) => {
    //   await updateInventory(dependencies).execute({
    //       id: food.id,
    //       count: foodData.inventory - food.count*tableCount
    //   })
    // }

    const resetFoodOrder = async ({ weddingId }) => {
      await DB.foodOrder.deleteMany({
        where: {
          "wedding_id": weddingId
        }
      })
    }

    const resetServiceOrder = async ({ weddingId }) => {
      await DB.serviceOrder.deleteMany({
        where: {
          "wedding_id": weddingId
        }
      })
    }

    const foodOrderProcess = async ({
        foods,
        weddingId,
        totalPrice,
    }) => {
      // Customer data
      let errorFoodList = []
      // console.log(foods)

      await resetFoodOrder({weddingId})

      for (const food of foods) {
        const orderData = await orderFood(dependencies).execute({
          food,
          weddingId: weddingId,
        })

        if(orderData?.error) {
          errorFoodList.push(orderData.msg)
          continue
        }

        let foodData = await getFood(dependencies).execute({id: food.id})
        foodData = foodData.data[0]
       
        totalPrice += foodData.price * food.count
      }

      return {
        msg: errorFoodList,
        totalPrice
      }
    }

    const getFoodPriceForWedding = async({weddingId}) => {

      const foodWedding = await DB.foodOrder.findMany({
        where: {
          "wedding_id":weddingId
        }
      })

      let foodPrice = foodWedding.reduce((total, current) => {
        return total += current.food_price * current.count
      }, 0)

      return foodPrice
    }

    const serviceOrderProcess = async ({ 
      services,
      weddingId
    }) => {
      let totalPrice = 0

      await resetServiceOrder({weddingId})

      for (const service of services) {
        
        await orderService(dependencies).execute({
          service,
          weddingId: weddingId
        })

        let serviceData = await getService(dependencies).execute({
          id: service.id
        })
        serviceData = serviceData.data[0]

        totalPrice += serviceData.price

      }

      return {
        servicePrice: totalPrice
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
          weddingId
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
            totalPrice,
            res
          })
          return res.status(200).json({ data: result });
        }

        else if(req.query?.step === 'service'){
          let totalPrice = 0
          // get food price
          let foodPrice = await getFoodPriceForWedding({weddingId})

          totalPrice += foodPrice

          const serviceData = await serviceOrderProcess({
            services,
            totalPrice,
            weddingId
          })

          const dataWeeding = await getWedding(dependencies).execute({id: weddingId })

          return res.status(200).json({ 
            totalPrice: totalPrice + serviceData.servicePrice,
            service: serviceData,
            weddingData: dataWeeding.data[0]
          });
        }


        return res.status(400).json({msg: 'Which step do you want [food, wedding]?'});
      } catch (error) {
          console.error('Error placing wedding order:', error);
          return res.status(500).send({ message: 'Failed to place wedding order' });
      }
  }
}


