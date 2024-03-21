module.exports = (dependencies) => {
    const {
        useCases: {
            customer: { createCustomer },
        },
        } = dependencies
  
    return async (req, res) => {
      try {
        const { name, phone } = req.body
  
        const result = await createCustomer(dependencies).execute({
            name, phone
        })
  
        if (result?.data) {
          return res.status(200).json({ data: result?.data })
        } else if (result?.error) {
          return res.status(500).json({ error: result?.error})
        }
      } catch (error) {
        return res.status(500).json({ error: error })
      }
    }
  }
  