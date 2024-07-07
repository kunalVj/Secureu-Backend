const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  console.log("Auth Header:", authHeader);
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.replace('Bearer ', '');
  console.log("Token:", token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("Token Error:", err);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;



// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//     const token = req.header('Authorization').replace('Bearer', '');
//     if(!token){
//         return res.status(401).json({message: 'No token provided'});
//     }

//     try{
//         const decode = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decode;
//         next();
//     }
//     catch{
//         res.status(401).json({message: 'Invalid Token'});
//     }
// };

// module.exports = authMiddleware;