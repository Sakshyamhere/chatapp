const express = require("express");
const multer = require('multer');
const { userSignUp, userLogIn } = require("../controllers/user.controller");
const { upload } = require("../../middlewares/cloudinary");
const router = express.Router();
router.post('/usersignup',upload.single('image'),userSignUp)
router.post('/userlogin',userLogIn)
module.exports = router