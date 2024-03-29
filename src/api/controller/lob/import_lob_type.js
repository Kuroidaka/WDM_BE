module.exports = (dependencies) => {
  const {
    useCases: {
      lob: { importLobType },
    },
  } = dependencies

  return async (req, res) => {
    try {
      const { 
        maxTableCount,
        minTablePrice,
        depositPercent,
        typeName
      } = req.body

      const result = await importLobType(dependencies).execute({
        maxTableCount,
        minTablePrice,
        depositPercent,
        typeName
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
