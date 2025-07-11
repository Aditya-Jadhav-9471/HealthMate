import jwt from 'jsonwebtoken';

const authAdmin = async (req, res, next) => {
  try {
    const aToken = req.headers['atoken'] || req.headers['aToken']; // Case-insensitive
    if (!aToken) {
      return res.status(401).json({ success: false, message: "Access Denied: No token provided" });
    }
    const token_decode = jwt.verify(aToken, process.env.JWT_SECRET);   
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ success: false, message: "Invalid Token" });
    }
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({ success: false, message: `Authentication failed: ${error.message}` });
  }
};

export default authAdmin;