module.exports = (dependencies) => {
    const {
      useCases: {
        food: { updateFood },
      },
    } = dependencies
  
    return async (req, res) => {
      try {
        const { id, name, price, status, is_drink, inventory } = req.body
  
        const result = await updateFood(dependencies).execute({
          id,
          name,
          price,
          status,
          is_drink,
          inventory
        })
  
        if (result?.data) {
          return res.status(200).json({ data: result?.data })
        } else if (result?.error) {
          return res.status(500).json({ error: result?.error })
        }
      } catch (error) {
        return res.status(500).json({ error: error })
      }
    }
  }
  