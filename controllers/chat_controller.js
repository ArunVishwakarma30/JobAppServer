const Chat = require('../models/chat');
const User = require('../models/user');

module.exports = {

    // Create chat, ## Change this function name from accessChat to createChat 
    accessChat: async (req, res) => {
        const { userId } = req.body;
        if (!userId) {
            res.status(400).json("Invalid user Id ");
        }

        var isChat = await Chat.find({
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: { $eq: req.user.id } } },
                { users: { $elemMatch: { $eq: userId } } }
            ]
        })
            .populate("users", "-password")
            .populate("latestMessage")

        isChat = await User.populate(isChat, {
            path: "latestMessage.sender",
            select: "userName profile email"

        })

        if (isChat.length > 0) {
            res.send(isChat[0])
        } else {
            var chatData = {
                chatName: req.user.id,
                isGroupChat: false,
                users: [
                    req.user.id, userId
                ]
            };

            try {
                const createdChat = await Chat.create(chatData);
                const FullChat = await Chat.findOne({ _id: createdChat._id, }).populate(
                    "users", "-password"
                );
                res.status(200).json(FullChat);

            } catch (error) {
                res.status(400).json("Failed to create chat ")

            }

        }
    },



    getChat: async (req, res) => {
        try {
            Chat.find({ users: { $elemMatch: { $eq: req.user.id } } })
                .populate("users", "-password")
                .populate("groupAdmin", "-password")
                .populate("latestMessage")
                .sort({ updateAt: -1 })
                .then(async (result) => {
                    result = await User.populate(result, {
                        path: "latestMessage.sender",
                        select: "userName profile email"

                    });
                    return res.json(result);
                })

        } catch (error) {
            return res.status(500).json("Failed to retrieve chats ")

        }
    }


}