const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatroomSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
});

mongoose.model("chatrooms", chatroomSchema)
