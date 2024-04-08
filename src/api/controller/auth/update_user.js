const bcrypt  = require('bcryptjs')
const jwt  = require('jsonwebtoken')


module.exports = (dependencies) => {
    const { 
        DB,
        useCases:{
            user: {
                findUser
            }
    } } = dependencies;

    return async (req, res) => {
        
        try {
            const { displayName, username } = req.body

            const newUser = await DB.user.update({
                where: {
                    username
                },
                data: {
                    "display_name": displayName
                }
            })

            return res.status(200).json({ data: newUser });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error });
        }
   
    }
}