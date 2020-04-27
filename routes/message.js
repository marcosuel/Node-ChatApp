const express = require('express')
const router = express.Router()
const messageController = require("../controllers/messageController")
const {checkAuthenticaded} = require("../helpers/checkAuthenticaded")

router.post("/send", checkAuthenticaded, messageController.send)

//router.post("/send", checkAuthenticaded, messageController.send)

module.exports = router;