const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    chatroom: {
        type: Schema.Types.ObjectId,
        ref: "chatrooms",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    message: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

mongoose.model("messages", messageSchema)
