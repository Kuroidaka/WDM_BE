module.exports = (dependencies) => {
    const {
      useCases: {
        lob: { importLob },
        customer: { findCustomer, createCustomer },
        wedding: { createWedding },
        order: { orderFood },
        food: { getFood, updateInventory }
      },
    } = dependencies

    const weddingProcess = async ({  
      groom,
      bride,
      weddingDate,
      shift,
      lobbyId,
      deposit,
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
        deposit,
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
      tableCount
    }) => {
      let totalPrice = 0
      // Customer data
      for (const food of foods) {
        await orderFood(dependencies).execute({
          food,
          weddingId: wedding.data
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
          minTablePrice
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
            deposit,
            tableCount,
            note,
            minTablePrice
          })
          return res.status(200).json({ data: result });
        }
        else if(res.query?.step === 'food'){
          const result = await foodOrderProcess({
            foods,
            tableCount
          })
          return res.status(200).json({ data: result });
        }


        // Convert weddingDate to a proper Date object


        // // Create the Wedding order
        // const wedding = await db.Wedding.create({
        //     groom,
        //     bride,
        //     'wedding_date': new Date(weddingDate),
        //     shift,
        //     'lobby_id': lobbyId,
        //     'customer_id': customerId,
        //     deposit,
        //     'table_count': tableCount,
        //     'min_table_price': minTablePrice, // Assume a default or calculate based on input/lobby
        //     note
        // });

        // // Associate foods and services with the wedding
        // // Assuming you have methods to find foods and services by ID
        // for (const foodId of foods) {
        //     await db.FoodOrder.create({
        //         food_id: foodId,
        //         wedding_id: wedding.id,
        //         count: 1 // Or another logic for the count
        //     });
        // }

        // for (const serviceId of services) {
        //     await db.ServiceOrder.create({
        //         service_id: serviceId,
        //         wedding_id: wedding.id,
        //         count: 1 // Or another logic for the count
        //     });
        // }

        return res.status(400).json({msg: 'Which step do you want [food, wedding]?'});
      } catch (error) {
          console.error('Error placing wedding order:', error);
          return res.status(500).send({ message: 'Failed to place wedding order' });
      }
  }
}