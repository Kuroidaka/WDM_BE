module.exports = (dependencies) => {
  const {
    useCases: {
      lob: { deleteLobType },
    },
  } = dependencies

  return async (req, res) => {
    try {
      const { id } = req.body

      const result = await deleteLobType(dependencies).execute({
        id
      })

      if (result?.message) {
        return res.status(200).json({ message: result.message })
      } else if (result?.error) {
        return res.status(500).json({ error: result.error })
      }
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
}
