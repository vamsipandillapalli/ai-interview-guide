const express = require("express")
const {registerUser,loginUser,getUserProfile} = require("../controllers/authController")
const {protect} = require("../middlewares/authMiddleware")
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware")
//
router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/profile",protect,getUserProfile)

// router.post("/upload-image",upload.single("image"),(req,res)=>
// {
// 	if(!req.file)
// 	{
// 		return res.status(400).json({message:"Please choose a file"})
// 	}
// 	const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
//     res.status(201).json({imageUrl})
// })

//const upload = require("./upload"); 
router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Please choose a file" });
  }

  // Cloudinary automatically adds a secure URL to req.file.path
  res.status(201).json({
    imageUrl: req.file.path,  // Cloudinary CDN URL
  });
});

module.exports = router;
