export default (dependencies) => {
    const {
      useCases: {
        service: { importService },
      },
    } = dependencies
  
    return async (req, res) => {
      try {
        const { name, price, status } = req.body
  
        const result = await importService(dependencies).execute({
          name,
          price,
          status
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
  