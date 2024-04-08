const bcrypt  = require('bcryptjs')
const jwt  = require('jsonwebtoken')


module.exports = (dependencies) => {
    const { 
        DB,
        useCases:{
            user: {
                addUser,
                findUser
            }
        }
    } = dependencies;

    return async (req, res) => {
        
        try {
            const {
                displayName,
                username,
                password
            } = req.body;

            // check if account have privilege to register account
            if(!req.user?.permissionList?.some(permission => permission.id === 'perm2')) return res.status(401).json({ msg: "you don't have permission" });



            // check exist user
            const result = await findUser(dependencies).execute({ username })
            if(result?.error) return res.status(500).json({ error: result?.error });
            if(result.data.length > 0) {
                return res.status(200).json({ msg: "username already exist" });
            }
            
            // check password
            if (!password) return res.status(400).json({msg : 'Password is required'});

            // hash the password using bcrypt
            const hashedPassword = await bcrypt.hash(password, 10);

            // create new user
            const newUser = await addUser(dependencies).execute({ 
                displayName,
                username,
                password: hashedPassword
            })
            if(newUser?.error) return res.status(500).json({ error: newUser?.error });

            // const token = jwt.sign({ id: newUser.data.id, username}, 'secret-key', { expiresIn: '1h' });

            return res.status(200).json({ data: newUser.data });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error });
        }
   
    }
}