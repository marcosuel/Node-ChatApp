const mongoose = require("mongoose")

require("./models/User")
require("./models/Message")
const Message = mongoose.model("messages")
require("./models/Chatroom")


const app = require("./app");
const server = require('http').createServer(app)
const io = require('socket.io')(server)



let messages = []


io.on('connection', socket => {

    let room_id = ""

    console.log("Socket conectado: "+ socket.id)

    //socket.emit('previousMessages', messages)

    socket.on('sendMessage', data => {
        messages.push(data)
        socket.to(data.room_id).emit('receivedMessage', data)
        //socket.broadcast.emit('receivedMessage', data)
    })

    socket.on('join', data => {
        
        room_id = data.room
        user_id = data.user
        socket.join(room_id);

        var prev = []

        Message.find({chatroom: room_id}).populate('user').sort({createdAt: "asc"}).exec(function (err, messages){

            messages.forEach(message => {
                prev.push({author_id: message.user._id, author: message.user.name, message: message.message})
            });

            socket.emit('previousMessages', prev)

        });
        
        
    })




});




const PORT = 8081

server.listen(PORT, () => {
    console.log("Server listen on port "+PORT)
});