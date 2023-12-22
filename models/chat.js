const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({

    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: flase },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    latesMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, { timestamps: true })

module.exports = mongoose.model("Chat", chatSchema)