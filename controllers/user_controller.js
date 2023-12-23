const User = require('../models/user');
const CryptoJS = require('crypto-js');

module.exports = {

    // Update function
    updateUser: async (req, res) => {
        try {
            if (req.body.password) {
                req.body.password = CryptoJS.AES.encrypt(req.body.password, 'jobApp2023').toString();
            }

            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body // this means here we take everything from the body and update in the database
            }, { new: true });

            if (!updatedUser) {
                return res.status(404).json('User not found');
            }

            const { password, __v, ...others } = updatedUser._doc;
            // updatedUser._doc: This is the JavaScript object representing the MongoDB
            // document returned by Mongoose. In Mongoose, the document is often wrapped with additional metadata, 
            // and _doc is used to access the underlying plain JavaScript object containing the document's data.
            res.status(200).json(others);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Delete function
    deleteUser: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("Account Successfully Deleted!")
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Get User function
    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id)
            const { password, __v, ...userData } = user._doc;
            res.status(200).json(userData);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Get all Users function
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            const sanitizedUsers = users.map(user => {
                const { password, __v, ...userData } = user._doc;
                return userData;
            });
            res.status(200).json(sanitizedUsers);
        } catch (error) {
            res.status(500).json(error);
        }
    }

};
