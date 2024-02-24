export default (dependencies) => {
    const { useCases:{
        food: {
            getFood
        }
    } } = dependencies;

    return async (req, res) => {
        
  
        try {
            // Get all conversations from the database
           const list = await getFood(dependencies).execute()

            return res.status(200).json({ data: list });
        } catch (error) {
         
            return res.status(500).json({ error: error });
        }
   
    }
}