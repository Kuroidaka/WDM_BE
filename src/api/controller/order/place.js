module.exports = (dependencies) => {
    const {
      useCases: {
        lob: { importLob },
      },
    } = dependencies
  
    return async (req, res) => {
      try {
        const { 
          name,
          maxTableCount,
          minTablePrice 
        } = req.body
  
        const result = await importLob(dependencies).execute({
          name,
          maxTableCount,
          minTablePrice 
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
  