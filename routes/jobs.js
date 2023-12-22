const router = require('express').Router();
const JobController = require('../controllers/job_controller');
const {verifyAndAuthorization, verifyToken, verifyIsAdmin} = require('../middleware/verifyToken')


// POST jobs
router.post('/', verifyIsAdmin, JobController.createJob);

// Update job
router.put('/:id',verifyIsAdmin, JobController.updateJob);

// Delete job
router.delete('/:id',verifyIsAdmin, JobController.deleteJob);

// Get jobs 
router.get('/:id', JobController.getJob);

// Get all jobs
router.get('/', JobController.getAllJobs);

// Get job
router.get('/search/:key', JobController.searchJobs);

module.exports = router