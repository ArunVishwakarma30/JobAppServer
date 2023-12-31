const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        userName: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        loaction: { type: String, required: false },
        isAdmin: { type: Boolean, default: false },
        isAgent: { type: Boolean, default: false },
        skills: { type: Array, required: false },
        profile: { type: String, requird: true, default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' }
        
    },
    { timestamps: true } 
);

module.exports = mongoose.model("User", UserSchema);