const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: "dk3bpz4e1", 
    api_key: "394774441117335",
  api_secret: 'i8Uqh359KYCFGTLU29zsex3B7XQ'
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Profile', // Optional - specify folder to upload files to
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'] // Optional - specify allowed file formats
  }
});

const upload = multer({ storage: storage });
module.exports = {upload}