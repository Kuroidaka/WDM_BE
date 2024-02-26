import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
    let token = req.headers.authorization 
    
    if(!req.headers.authorization )  return res.status(401).json({ msg: 'Access denied. No token provided.'});

    if(token.split(" ")[0] === "Bearer"){
      token = req.headers.authorization.split(" ")[1];
    }
  
    console.log(token);
    if (!token) {
      return res.status(401).json({ msg: 'Access denied. No token provided.'});
    }
  
    try {
      const decoded = jwt.verify(token, 'secret-key');
      req.user = decoded;
      next();
    } catch (err) {
      res.status(400).json({ msg: 'Invalid token.'});
    }
};

export default verifyToken