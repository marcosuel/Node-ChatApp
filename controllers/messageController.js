const mongoose = require("mongoose")
const Message = mongoose.model("messages")


exports.send = (req, res) => {

    const {room_id, user_id, message} = req.body

    const newMessage = new Message({
        chatroom: room_id,
        user: user_id,
        message: message
    })


    newMessage.save().then().catch((err) => {
        req.flash("error_msg", "Houve um erro ao enviar a mensagem")
        res.redirect("/user/chatrooms)
    })

}