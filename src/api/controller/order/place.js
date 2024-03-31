const { calculateTimeDifference } = require('../../../utils/utils')


module.exports = (dependencies) => {
    const {
      DB,
      useCases: {
        lob: { importLob },
        customer: { findCustomer, createCustomer },
        wedding: { createWedding, getWedding },
        order: { orderFood, orderService },
        food: { getFood, updateInventory },
        service: { getService },
        bill: { createBill, getBill }
      },
    } = dependencies

    const checkWeddingDate = async ({weddingDate}) => {
      // Parse the input date and ensure it's the start of the day
      const startDate = new Date(weddingDate);
      startDate.setHours(0, 0, 0, 0);
  
      // Create a new Date object for the end of the day
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 1);
  
      // Query the database to find any events on this date
      const events = await DB.wedding.findMany({
          where: {
              wedding_date: {
                  gte: startDate,
                  lt: endDate,
              },
          },
      });
  
      // Check if any events were found
      return events

    }
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

      //check lob
      const lobby = await DB.lobby.findUnique({
        where: {
          id: lobbyId
        },
        include: {
          LobType: true
        }
      })

      if(tableCount > lobby.LobType["max_table_count"]) {
        return {
          msg: `This lobby's max table is ${lobby.LobType["max_table_count"]}(your order: ${tableCount})`
        }
      }

      const existDataOnDate = await checkWeddingDate({weddingDate})

      const isValidDate = await existDataOnDate.some(data => data.shift === shift)

      if(isValidDate) {
        return { msg: "this date & shift had a wedding"}
      }

      console.log("existDataOnDate", existDataOnDate)

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

    const modifyInventory = async ({ foodList }) => {

      for(const food of foodList) {

        let foodData = await getFood(dependencies).execute({id: food.food_id})
        foodData = foodData.data[0]

        let inventory = foodData.inventory

        inventory -= food.count
        
        await updateInventory(dependencies).execute({
            id: food.food_id,
            count: inventory
        })
      }
    }

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
        tableCount,
        minTablePrice,
        lobName,
        lobType

    }) => {
      // Customer data
      let errorFoodList = []
      let tablePrice = 0
      // console.log(foods)

      await resetFoodOrder({weddingId})
      //calc food price for each table
      for (const food of foods) {
        let foodData = await getFood(dependencies).execute({id: food.id})
        foodData = foodData.data[0]
       
        tablePrice += foodData.price * food.count
        totalPrice += foodData.price * food.count * tableCount
      }

      // check valid lob min price

      if(tablePrice < minTablePrice) {
        return {
          msg: `Lobby ${lobName} (Type ${lobType}) : min table price ${minTablePrice}(your: ${tablePrice})`
        }
      }

      // insert food order table
      for (const food of foods) { 
        const orderData = await orderFood(dependencies).execute({
          food,
          weddingId: weddingId,
        })
  
        if(orderData?.error) {
          errorFoodList.push(orderData.msg)
          continue
        }
      }
      return {
        msg: errorFoodList,
        totalPrice
      }
    }

    const getFoodPriceForWedding = async({weddingId}) => {

      let dataWedding = await DB.wedding.findUnique({
        where : {
          id: weddingId
        }
      })

      let tableCount = dataWedding['table_count'] 

      const foodWedding = await DB.foodOrder.findMany({
        where: {
          "wedding_id":weddingId
        }
      })

      let foodPrice = foodWedding.reduce((total, current) => {
        return total += current.food_price * current.count * tableCount
      }, 0)

      return foodPrice
    }

    const getServicePriceForWedding = async({weddingId}) => {

      const serviceWedding = await DB.serviceOrder.findMany({
        where: {
          "wedding_id":weddingId
        }
      })

      let servicePrice = serviceWedding.reduce((total, current) => {
        return total += current.service_price * current.count
      }, 0)

      return servicePrice
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

    const getDeposit = async ({ weddingId }) => {

        const weddingWithLobType = await DB.wedding.findUnique({
            where: {
                id: weddingId,
            },
            include: {
              Lobby: {
                include: {
                  LobType: true
                }
              }
            },
        });
        console.log("weddingWithLobType", weddingWithLobType)
        return weddingWithLobType.Lobby.LobType["deposit_percent"]
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

          let dataWedding = await DB.wedding.findUnique({
            where : {
              id: weddingId
            },
            include: {
              Lobby: {
                include: {
                  LobType: true
                }
              }
            }
          })
    
          let tableCount = dataWedding['table_count']
          let minTablePrice = dataWedding.Lobby.LobType["min_table_price"] 
          let lobName = dataWedding.Lobby.name
          let lobType = dataWedding.Lobby.LobType["type_name"]

          const result = await foodOrderProcess({
            foods,
            tableCount,
            weddingId,
            totalPrice,
            minTablePrice,
            lobName,
            lobType
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

        else if(req.query?.step === 'deposit'){

          let finalData = {}
          const transacAmount = req.body["transaction_amount"]
          // calc price
          let foodPrice = await getFoodPriceForWedding({weddingId})
          let servicePrice = await getServicePriceForWedding({weddingId})
          let totalPrice = servicePrice + foodPrice
          

          // deposit
          const deposit = await getDeposit({weddingId})
          const depositRequire = deposit * totalPrice / 100
          if(transacAmount < depositRequire) {
            return res.status(200).json({msg: `deposit amount for this lobby need to be ${deposit}% <=> ${depositRequire}`});
          }

          // check penalty 
          let extraFee = 0
          let dataWeeding = await getWedding(dependencies).execute({id: weddingId })
          dataWeeding = dataWeeding.data[0]

          let isPenalty = dataWeeding["is_penalty_mode"]
          if(isPenalty) {
            let weddingDate = new Date(dataWeeding["wedding_date"] )
            let payDate = new Date()

            const timeDifference = calculateTimeDifference(weddingDate, payDate);

            if(timeDifference.days > 0) {
              extraFee = timeDifference.days* (totalPrice / 100)
              finalData.extraFee = extraFee


            }
          }

          /*=============
          PREVIOUS DEPOSIT
          ===============*/

          // check exist bill
          const bills = await getBill(dependencies).execute({weddingId})
          const recentBill = bills.data[0]

          // if bill exist
          let remainPrice
          if(bills.data.length > 0) { //deposit before
            if(recentBill['remain_amount'] <= 0) {
              return res.status(200).json({ msg: `your bill have been fully paid`})
            }
            let newTotalPrice = recentBill['remain_amount']
            if(!isPenalty && recentBill["extra_fee"] > 0) {
              newTotalPrice -= recentBill["extra_fee"] 
            }
            else if(isPenalty && recentBill["extra_fee"] === 0) {
              newTotalPrice += extraFee 
            }
            remainPrice = newTotalPrice - transacAmount
          }
          else { //first time deposit
            // calc remain price
            let newTotalPrice = totalPrice
            if(isPenalty) {
              newTotalPrice = totalPrice + extraFee 
            } 
            remainPrice = newTotalPrice - transacAmount

            // update inventory
            const foodDataWedding = await DB.foodOrder.findMany({
              where: {
                "wedding_id": weddingId
              }
            })
            await modifyInventory({foodList: foodDataWedding})

          }

          // final data
          finalData = {
            ...finalData,
            totalPrice: totalPrice,
            weddingData: dataWeeding,
            "deposit_amount": transacAmount,
            "remain": remainPrice,
            "foodPrice": foodPrice,
            "servicePrice": servicePrice,
            "extra_fee": extraFee
          }

          // create bill
          await createBill(dependencies).execute({
            weddingId,
            serviceTotalPrice: servicePrice,
            totalPrice: totalPrice,
            depositRequire: deposit,
            depositAmount: transacAmount,
            remainAmount: remainPrice,
            extraFee: extraFee
          })


          return res.status(200).json(finalData);
        }
        else if(req.query?.step === 'pay'){

          let finalData = {}
          const transacAmount = req.body["transaction_amount"]
          // calc price
          let foodPrice = await getFoodPriceForWedding({weddingId})
          let servicePrice = await getServicePriceForWedding({weddingId})
          let totalPrice = servicePrice + foodPrice

          // check penalty 
          let extraFee = 0
          let dataWeeding = await getWedding(dependencies).execute({id: weddingId })
          dataWeeding = dataWeeding.data[0]
          let isPenalty = dataWeeding["is_penalty_mode"]
          if(isPenalty) {
            let weddingDate = new Date(dataWeeding["wedding_date"] )
            let payDate = new Date()

            const timeDifference = calculateTimeDifference(weddingDate, payDate);

            if(timeDifference.days > 0) {
              extraFee = timeDifference.days* (totalPrice / 100)
              finalData.extraFee = extraFee
            }
          }

          /*=============
          PREVIOUS DEPOSIT
          ===============*/


          // check exist bill
          const bills = await getBill(dependencies).execute({weddingId})
          const recentBill = bills.data[0]

          // if bill exist
          let remainPrice
          let newTotalPrice = 0
          if (recentBill){ // have deposit before
            if(recentBill['remain_amount'] <= 0) {
              return res.status(200).json({ msg: `your bill have been fully paid`})
            }

            newTotalPrice = recentBill['remain_amount']
            // calc remain price
            if(!isPenalty && recentBill["extra_fee"] > 0) {
              newTotalPrice -= recentBill["extra_fee"] 
            }
            else if(isPenalty && recentBill["extra_fee"] === 0) {
              newTotalPrice += extraFee 
            }
            remainPrice = newTotalPrice - transacAmount
          }
          else { //first time payment (no deposit before)
            // calc remain price
            newTotalPrice = totalPrice
            if(isPenalty) {
              newTotalPrice = totalPrice + extraFee 
            } 
            remainPrice = newTotalPrice - transacAmount
          }
          
          if(remainPrice > 0) {
            return res.status(200).json({ msg: `payment is not enough, you paid: ${transacAmount} in remain total: ${newTotalPrice}`})
          }
           // update inventory
          const foodDataWedding = await DB.foodOrder.findMany({
            where: {
              "wedding_id": weddingId
            }
          })
          await modifyInventory({foodList: foodDataWedding})
          // final data
          finalData = {
            ...finalData,
            totalPrice: totalPrice,
            weddingData: dataWeeding,
            "deposit_amount": transacAmount,
            "remain": remainPrice,
            "foodPrice": foodPrice,
            "servicePrice": servicePrice,
            "extra_fee": extraFee
          }
          // get deposit data
          const deposit = await getDeposit({weddingId})

          // create bill
          await createBill(dependencies).execute({
            weddingId,
            serviceTotalPrice: servicePrice,
            totalPrice: totalPrice,
            depositRequire: deposit,
            depositAmount: transacAmount,
            remainAmount: remainPrice,
            extraFee: extraFee
          })


          return res.status(200).json(finalData);
        }
        return res.status(400).json({msg: 'Which step do you want [food, wedding, service, deposit, pay]?'});
      } catch (error) {
          console.error('Error placing wedding order:', error);
          return res.status(500).send({ message: 'Failed to place wedding order' });
      }
  }
}


