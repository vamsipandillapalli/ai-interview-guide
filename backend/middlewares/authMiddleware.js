// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const protect = async (req, res, next) => {
  try{
	let token = req.headers.authorization
	if(token && token.startsWith("Bearer"))
	{
		const decoded = jwt.verify(token.split(" ")[1],process.env.JWT_SECRET)
		req.user = await User.findById(decoded.id).select("-password")
		next()
	}
	else
	{
		res.status(401).json({massage: "Not authorized,No token"})
	}
  }
  catch(error)
  {
	res.status(401).json({massage : "token failed",error:error.massage})
  }
};

module.exports = { protect };
