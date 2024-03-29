module.exports = (dependencies) => {
    const { useCases:{
        service: {
            getService
        }
    } } = dependencies;

    return async (req, res) => {
        const { id="" } = req.body
        try {
           const result = await getService(dependencies).execute({ id: id })

            if (result?.data) {
                return res.status(200).json({ data: result?.data })
            } else if (result?.error) {
            return res.status(500).json({ error: result?.error})
            }
        } catch (error) {
         
            return res.status(500).json({ error: error });
        }
   
    }
}