const express = require("express");
const { search, getAllPeople, getUserWithId } = require("../controllers/search.controller");
const router = express.Router()
router.get('/search', search)
router.get('/all', getAllPeople)
router.get('/getuserwithid', getUserWithId)
module.exports = router