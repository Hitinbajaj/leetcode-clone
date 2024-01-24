const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  acceptance: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  exampleIn: {
    type: String,
    required: true,
  },
  exampleOut: {
    type: String,
    required: true,
  },
});

const Problem = mongoose.model('Problem', ProblemSchema);

module.exports = Problem;
