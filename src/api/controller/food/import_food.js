module.exports = (dependencies) => {
  const {
    useCases: {
      food: { importFood },
    },
  } = dependencies

  return async (req, res) => {
    try {
      const { name, price, status, inventory } = req.body

      const result = await importFood(dependencies).execute({
        name,
        price,
        status,
        inventory
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
