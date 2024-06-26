module.exports = (dependencies) => {
    const { useCases:{
        lob: {
            getLob
        }
    } } = dependencies;

    return async (req, res) => {
        const { date, lobTypeId } = req.body
        try {
           const result = await getLob(dependencies).execute({date, lobTypeId})

           

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