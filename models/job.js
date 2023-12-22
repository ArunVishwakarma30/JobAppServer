const mongoose = require('mongoose');

const JobSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        location: { type: String, required: true },
        company: { type: String, required: true },
        desc: { type: String, required: true },
        salary: { type: String, required: true },
        period: { type: String, required: true },
        contract: { type: String, required: true },
        requirements: { type: Array, required: true },
        imageUrl: { type: String, required: true },
        // agent Id is the type of mongoose OBjectId, because we need to identify the person who is uploaing the job and we need to give a reference,
        // its like an foreign key
        agentId: { type: mongoose.SchemaTypes.ObjectId, ref: "User", required: true },

    },
    { timeStamps: true }
);

module.exports = mongoose.model("Job", JobSchema);