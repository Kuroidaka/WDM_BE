const bcrypt  = require('bcryptjs')
const jwt  = require('jsonwebtoken')


module.exports = (dependencies) => {
    const { useCases:{
        user: {
            findUser
        }
    } } = dependencies;

    return async (req, res) => {
        
        try {
            const { username, password } = req.body;
            const notFound = { msg : 'username or password is incorrect' }

            if(!username) return res.status(401).json(notFound)
            if(!password) return res.status(401).json(notFound);

            // check exist account
            const result = await findUser(dependencies).execute({ username })
            if(result?.error) return res.status(500).json({ error: result?.error });
            if(result.data.length === 0) return res.status(401).json(notFound);
            const account = result.data[0]
            
            // compare password
            if (!await bcrypt.compare(password, account.password)) {
                return res.status(401).json(notFound);   
            }

            // // gen token
            const token = jwt.sign({ id: account.id, username, isAdmin: account.isAdmin }, 'secret-key', { expiresIn: '1h' });
            console.log(token)

            return res.status(200).json({ data: { token } });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error });
        }
   
    }
}