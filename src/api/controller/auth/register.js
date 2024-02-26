import bcrypt from'bcryptjs';
import jwt from'jsonwebtoken';


export default (dependencies) => {
    const { useCases:{
        user: {
            addUser,
            findUser
        }
    } } = dependencies;

    return async (req, res) => {
        
        try {
            const {
                isAdmin,
                displayName,
                username,
                password
            } = req.body;

            // check exist user
            const user = await findUser(dependencies).execute({ username })
            if(user?.error) return res.status(500).json({ error: user?.error });
            if(user?.data) {
                return res.status(200).json({ msg: "username already exist" });
            }
            
            // check password
            if (!password) return res.status(400).json({msg : 'Password is required'});

            // hash the password using bcrypt
            const hashedPassword = await bcrypt.hash(password, 10);

            // create new user
            const newUser = await addUser(dependencies).execute({ 
                isAdmin,
                displayName,
                username,
                password: hashedPassword
            })
            if(newUser?.error) return res.status(500).json({ error: newUser?.error });

            // const token = jwt.sign({ id: newUser.data.id, username, isAdmin }, 'secret-key', { expiresIn: '1h' });

            return res.status(200).json({ data: newUser.data });
        } catch (error) {
         
            return res.status(500).json({ error: error });
        }
   
    }
}