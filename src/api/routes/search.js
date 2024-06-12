const express = require("express");
const { search, getAllPeople } = require("../controllers/search.controller");
const router = express.Router()
router.get('/search', search)
router.get('/all', getAllPeople)
module.exports = router