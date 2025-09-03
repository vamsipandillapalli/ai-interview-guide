const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const genarateToken = (userId) =>
{
	return jwt.sign({id:userId},process.env.JWT_SECRET,{expiresIn:"1d"})
}
//register a new user
//post api/auth/register
const registerUser = async (req,res)=>
{
	try {
   const {name,email,password,profileImageUrl} = req.body
   //check if user alread exits
   const userExits = await User.findOne({email})
   if(userExits)
   {
	return res.status(400).json({message:"User already exits"})
   }
   	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(password,salt);
	const user = await User.create(
		{
			name,email,
			password : hashedPassword,
			profileImageUrl
		}
	)
	res.status(201).json({_id:user._id,
		name:user.name,
		email:user.email,
		profileImageUrl:user.profileImageUrl,
		token:genarateToken(user._id)

	})

	}
	catch(error)
	{
		res.status(500).json({message:"server error",error:error.message})
	}
}
const loginUser = async (req,res)=>
{
	try{
       const {email,password} = req.body
	   const user = await User.findOne({email});
	   if(!user)
	    {
		 return res.status(500).json({message:"Invalid email or password"})
	    }
	   const isMatch = await bcrypt.compare(password,user.password)
	    if(!isMatch)
	    {
		 return res.status(500).json({message:"Enter correct password"})
	    }
	    //const token = genarateToken(user._id)
	   	return res.status(201).json({_id:user._id,
		 name:user.name,
		 email:user.email,
		 profileImageUrl:user.profileImageUrl,
		 token:genarateToken(user._id)

	     })
	}
	catch(error){
			return res.status(500).json({message:"server error",error:error.message})
	   }
    
}
// get user profiles
const getUserProfile = async (req,res) =>
{
     try
	 {
        const user = await User.findById(req.user.id).select("-password")
		if(!user)
		{
			return res.status(404).json({message:"User not found"})
		}
		return res.json(user)
	 }
	 catch(error){
			return res.status(500).json({message:"server error",error:error.message})
	   }
}
module.exports = {registerUser,loginUser,getUserProfile}