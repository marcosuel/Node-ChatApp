const express = require('express')
const router = express.Router()
const chatroomController = require("../controllers/chatroomController")

const {checkAuthenticaded} = require("../helpers/checkAuthenticaded")


router.get("/new", checkAuthenticaded, (req, res) => {
    res.render("chatroom/newChatroom")
})

router.post("/new", checkAuthenticaded, chatroomController.createChatroom)

module.exports = router