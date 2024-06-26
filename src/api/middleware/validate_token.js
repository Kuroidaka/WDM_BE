const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
    let token = req.headers.authorization 
    
    if(!req.headers.authorization )  return res.status(401).json({ msg: 'Access denied. No token provided.'});

    if(token.split(" ")[0] === "Bearer"){
      token = req.headers.authorization.split(" ")[1];
    }
  
    if (!token) {
      return res.status(401).json({ msg: 'Access denied. No token provided.'});
    }
  
    try {
      const decoded = await jwt.verify(token, 'secret-key');
      req.user = decoded;
      req.token = token
      // console.log("decode:", req.user)
      next();
    } catch (err) {
      res.status(400).json({ msg: 'Invalid token.'});
    }
};

module.exports = verifyToken