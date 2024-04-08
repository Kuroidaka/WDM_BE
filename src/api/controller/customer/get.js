module.exports = (dependencies) => {
    const {
        useCases: {
            customer: { findCustomer },
        },
        } = dependencies
  
    return async (req, res) => {
      try {
        const { phone="" } = req.body
        
        let customerData 

        if(phone) {
          customerData = await findCustomer(dependencies).execute({phone})
        }
        else {
          customerData = await findCustomer(dependencies).execute({phone: ""})
        }

        if (customerData?.data) {
          return res.status(200).json({ data: customerData.data })
        } else if (result?.error) {
          return res.status(500).json({ error: result?.error})
        }
      } catch (error) {
        return res.status(500).json({ error: error })
      }
    }
  }
  