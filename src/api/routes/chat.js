const express = require("express");
const { getMessage, sendMessage, getFriends } = require("../controllers/chats.controller");
const router = express.Router()
router.get('/getmessage', getMessage)
router.post('/sendmessage', sendMessage)
router.get('/getfriends', getFriends)
module.exports = router