const Submissions= require('../models/submissionModel');

const getSubmissions = async (req, res) => {
    try {
        const sub = await Submissions.find({}).populate('problemId', 'title').populate('userId', 'email');
        res.status(200).send({status: 'ok', sub});
    } catch (err) {
        console.log(err)
        res.status(500).send( `Error ${err}`);
    }
};
const mySubmissions = async (req, res) => {
    try {
        const sub = await Submissions.find({userId: req.user._id}).populate('problemId', 'title').populate('userId', 'email');
        res.status(200).send({status: 'ok', sub});
    } catch (err) {
        console.log(err)
        res.status(500).send( `Error ${err}`);
    }
};
const getSubmissionById = async (req, res) => {
    try {
      const problem = await Submissions.findById(req.params.id).populate('problemId', 'title').populate('userId', 'email');

      res.json(problem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };
const submitCode = async (req, res) =>{
    try {
        const {problemId, code} = req.body;
 
        const userId = req.user._id;
        // decide for status to be true or false;
        const status=true;
        await Submissions.create({
            problemId,
            userId,
            code,
            status
        });
        // return status
        res.status(201).send('Submitted successfully');
    } 
    catch (err){
        console.log(err)
        res.status(500).send( `Error ${err}`);
    }
};

module.exports = {getSubmissions, mySubmissions, submitCode, getSubmissionById};