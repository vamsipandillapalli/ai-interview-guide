// const multer = require("multer")
// const storage = multer.diskStorage(
// 	{
// 		destination : (req,file,cb) =>
// 		{
// 			cb(null,"./uploads")
// 		},
// 		filename : (req,file,cb)=>
// 		{
// 			cb(null,`${Date.now()}-${file.originalname}`)
// 		},
		
// 	}
// );
// const fileFilter = (req,file,cb)=>
// {
// 	const allowedTypes = ['image/jpeg','image/jpg','image/png']
// 	if(allowedTypes.includes(file.mimetype))
// 	{
// 		cb(null,true)
// 	}
// 	else
// 	{
// 		cb(new Error("only .jpg,.png,.jpeg, formates are allowed"),false);
// 	}
// }
// const upload = multer({storage,fileFilter})
// module.exports = upload
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const connectCloudinary = require("../config/cloudinary");

const cloudinary = connectCloudinary(); // call the function to get the object

const storage = new CloudinaryStorage({
  cloudinary: cloudinary, // now it’s a valid object
  params: {
    folder: "uploads",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });

module.exports = upload;
