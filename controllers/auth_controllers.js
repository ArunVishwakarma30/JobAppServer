const User = require('../models/user');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const user = require('../models/user');

module.exports = {
    // SignUp function
    createUser: async (req, res) => {
        const newUser = new User({
            userName: req.body.userName,
            email: req.body.email,
            profile: req.body.profile,

            // password: req.body.password,
            password: CryptoJS.AES.encrypt(req.body.password, 'jobApp2023').toString(),

        });
        try {
            const isExist = await User.findOne(
                { email: req.body.email }
            );
            if (isExist) {
                return res.status(409).json(`${req.body.email} already exists!`)
            }
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Login function
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({
                email: req.body.email
            })


            if (!user) {
                return res.status(401).json("Incorrect username or password. Please try again.");  // 401 : Unauthorized
            }
            const { password, __v, createdAt, ...others } = user._doc;

            const decreptaedPassword = CryptoJS.AES.decrypt(user.password, 'jobApp2023');
            const dePass = decreptaedPassword.toString(CryptoJS.enc.Utf8);

            if (dePass !== req.body.password) {
                return res.status(401).json("Incorrect Password");
            }

            // creating jwt
            const userToken = jwt.sign({
                id: user._id,
                isAdmin: user.isAdmin,
                isAgent: user.isAgent
            }, 'jobApp2023', { expiresIn: "21d" })

            // console.log(others)
            return res.status(200).json({ ...others, userToken });

        } catch (error) {
            return res.status(500) // 500 : Internal Server Error
        }
    },




}