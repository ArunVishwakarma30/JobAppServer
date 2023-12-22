const Job = require("../models/job")

module.exports = {
    createJob: async (req, res) => {
        const newJob = new Job(req.body)
        try {
            const savedJob = await newJob.save();
            const { __v, ...newJobInfo } = savedJob._doc
            res.status(200).json(newJobInfo)
        } catch (error) {
            res.status(500).json(error) // 500 --> Internal server error
        }
    },

    updateJob: async (req, res) => {
        try {
            const updatedJob = await Job.findByIdAndUpdate(req.params.id,
                { $set: req.body },
                { new: true }
            )

            const { __v, ...updatedJobInfo } = updatedJob._doc
            res.status(200).json(updatedJobInfo);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    deleteJob: async (req, res) => {
        try {
            await Job.findByIdAndDelete(req.params.id)

            res.status(200).json("Job deleted successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getJob: async (req, res) => {
        try {
            const job = await Job.findById(req.params.id)
            const { _id, __v, ...jobInfo } = job._doc

            res.status(200).json(jobInfo);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getAllJobs: async (req, res) => {
        try {
            const job = await Job.find(req.params.id)

            res.status(200).json(job);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    searchJobs: async (req, res) => {
        const searchTerm = req.params.key;
        try {
            const results = await Job.aggregate([
              {
                $match: {
                  $or: [
                    { title: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive name search
                    { company: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive city search
                    { desc: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive city search
                    { requirements: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive city search
                  ],
                },
              },
            ]);
        
            res.json(results);
          }catch (error) {
            res.status(500).json(error);
        }
    },
}