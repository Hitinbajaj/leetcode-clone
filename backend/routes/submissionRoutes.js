const { Router } = require("express");
const router = Router();
const {
    submitCode, 
    getSubmissions, 
    mySubmissions,
    getSubmissionById} = require ('../controllers/submissionControllers');

const userMiddleware = require('../middlewares/userMiddleware');

router.route('/all').get(getSubmissions);
router.route('/my').get(userMiddleware, mySubmissions);
router.route('/submit').post(userMiddleware, submitCode);
router.route('/:id').get(getSubmissionById);

module.exports = router;