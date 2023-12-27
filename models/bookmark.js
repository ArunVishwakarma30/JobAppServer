const mongoose = require('mongoose');

const BookMarkSchema = mongoose.Schema(
    {
        // these bookmarks are refering to the job, like foreign key
        job: {
            type : mongoose.Schema.Types.ObjectId ,
            ref: "Job"
        },
        userId: { type: String, required: true },

    },
    { timeStamps: true }
);

module.exports = mongoose.model("BookMark", BookMarkSchema);