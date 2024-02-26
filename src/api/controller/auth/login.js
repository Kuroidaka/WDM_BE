import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export default (dependencies) => {
    const { useCases:{
        user: {
            findUser
        }
    } } = dependencies;

    return async (req, res) => {
        
        try {
            const { username, password } = req.body;
            const notFound = { msg : 'username or password is incorrect' }

            const user = await findUser(dependencies).execute({ username })
            if(user?.error) return res.status(500).json({ error: user?.error });
            if(user?.data.length === 0) return res.status(200).json(notFound);

            // compare password
            if (!await bcrypt.compare(password, user.data.password)) {
                return res.status(401).json(notFound);   
            }

            // // gen token
            const token = jwt.sign({ id: user.data.id, username, isAdmin: user.data.isAdmin }, 'secret-key', { expiresIn: '1h' });
            console.log(token)

            return res.status(200).json({ data: { token } });
        } catch (error) {
            return res.status(500).json({ error: error });
        }
   
    }
}