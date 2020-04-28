const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatroomSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: "users"
        }
    ]
});

mongoose.model("chatrooms", chatroomSchema)
