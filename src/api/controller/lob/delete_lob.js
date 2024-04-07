module.exports = (dependencies) => {
    const {
      useCases: {
        lob: { deleteLob },
      },
    } = dependencies
  
    return async (req, res) => {
      try {
        const { id } = req.body
  
        const result = await deleteLob(dependencies).execute({
          id, res
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
  