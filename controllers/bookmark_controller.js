const BookMark = require('../models/bookmark')
const Job = require('../models/job')


module.exports = {
    createBookmark: async (req, res) => {
        const jobId = req.body.job;

        try {
            const job = await Job.findById(jobId)

            if (!job) {
                return res.status(404).json({ error: "Job not found" });
            }

            const newBook = new BookMark({job : job, userId : req.body.id});

            const savedBookMark = await newBook.save();
            res.status(201).json("Bookmark successfullt created.")
        } catch (error) {
            res.status(500).json(error)
        }
    },

    deleteBookmark: async (req, res) => {
        try {
            await BookMark.findByIdAndDelete(req.params.id)
            res.status(200).json("Bookmark successfullt deleted.")

        } catch (error) {
            res.status(500).json(error)

        }
    },


    getBookmarks: async (req, res) => {
        try {
            const bookmarks = await BookMark.find({ userId: req.params.userId });
            res.status(200).json(bookmarks);

        } catch (error) {
            res.status(500).json(error)

        }
    },

}
