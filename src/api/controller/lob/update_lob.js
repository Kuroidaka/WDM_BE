module.exports = (dependencies) => {
    const {
      useCases: {
        lob: { updateLob },
      },
    } = dependencies
  
    return async (req, res) => {
      try {
        const { id, name, lobTypeId } = req.body
  
        const result = await updateLob(dependencies).execute({
          id,
          name,
          lobTypeId
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
  