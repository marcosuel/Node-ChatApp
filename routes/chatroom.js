const express = require('express')
const router = express.Router()
const chatroomController = require("../controllers/chatroomController")
const mongoose = require("mongoose")
const Chatroom = mongoose.model("chatrooms")
const User = mongoose.model("users")

const {checkAuthenticaded} = require("../helpers/checkAuthenticaded")


router.get("/in/:id", checkAuthenticaded, chatroomController.renderRoom);


router.get("/new", checkAuthenticaded, (req, res) => {
    res.render("chatroom/newChatroom", {user_id: req.user._id})
})

router.post("/new", checkAuthenticaded, chatroomController.createChatroom)
router.post("/in/:id/addMember", checkAuthenticaded, chatroomController.addMember)


module.exports = router