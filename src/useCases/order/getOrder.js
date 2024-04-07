const { getStartAndEndOfDay } = require("../../utils/utils")

module.exports = (dependencies) => {
    const { DB } = dependencies;

    if (!DB) {
        throw new Error("DB should be exist in dependencies");
    }

    const execute = async ({
        id="",
        date
    }) => {
        try {
            let orders
            console.log(id)
            if(id !== "") {
                let order = await DB.wedding.findUnique({
                    where: {
                        id
                    },
                    include: {
                        Bill: true,
                        Customer: true
                    }
                });

                if (order && order.Bill.length > 0) {
                    // Sort bills by payment_date in descending order
                    order.Bill.sort((a, b) => b['payment_date'] - a['payment_date']);
                  }
                orders = [order]
            }
            else { 

                let queryObj = {
                    include: {
                        Bill: true, // Include all related bills
                        Customer: true
                      },
                }

                if(date) { 
                    const { startOfDay, endOfDay } = getStartAndEndOfDay(date)

                    queryObj.where = {
                        "wedding_date": {
                            "gte": startOfDay.toISOString(),
                            "lt": endOfDay.toISOString(),
                        }
                    }

                } 
                orders = await DB.wedding.findMany(queryObj);
                orders.forEach(order => {
                    if (order.Bill && order.Bill.length > 0) {
                        order.Bill.sort((a, b) => b.payment_date - a.payment_date);
                    }
                });
            }
            
            return {
                data: orders
            };
        } catch (error) {
            console.log(error, "DB:GET_ORDER:ERROR")
            return { 
                error: error
            }
        }
    }

    return { execute };
};


/*
ID: 
await getOrder(dependencies).execute({id: order.id })
foodData = foodData.data[0]

let result = await getOrder(dependencies).execute({})
result = result.data
*/