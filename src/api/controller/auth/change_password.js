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
            const { username, password, oldPassword } = req.body;
            const notFound = { msg : 'username or password is incorrect' }

            if(!username) return res.status(401).json(notFound)
            if(!password) return res.status(401).json(notFound);

            // check exist account
            const result = await findUser(dependencies).execute({ username })
            if(result?.error) return res.status(500).json({ error: result?.error });
            if(result.data.length === 0) return res.status(401).json(notFound);
            const account = result.data[0]
            
            // compare password
            if (!await bcrypt.compare(oldPassword, account.password)) {
                return res.status(401).json(notFound);   
            }

            // hash the password using bcrypt
            const hashedPassword = await bcrypt.hash(password, 10);

            // update user password
            const user = await DB.user.update({
                where: {
                    username
                },
                data: {
                    password: hashedPassword
                }
            })

            return res.status(200).json({ data: user });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error });
        }
   
    }
}