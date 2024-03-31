module.exports = (dependencies) => {
    const { useCases:{
        food: {
            getFood
        }
    } } = dependencies;

    return async (req, res) => {
        
        try {

            const result = await getFood(dependencies).execute({id: req.body.id || ""})


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