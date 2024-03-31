module.exports = (dependencies) => {
    const { DB } = dependencies;

    if (!DB) {
        throw new Error("DB should be exist in dependencies");
    }

    const execute = async ({
        id=""
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
                orders = await DB.wedding.findMany({
                    include: {
                        Bill: true, // Include all related bills
                        Customer: true
                      },
                });
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