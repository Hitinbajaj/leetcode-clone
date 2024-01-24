const mongoose = require('mongoose')

const SubmissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    problemId: {
      type: mongoose.Types.ObjectId,
      ref: 'Problem',
      required: true,
    },
    code: {
      type:  String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    }
  },
  {
    timestamps: true,
  },
)

const Submission = mongoose.model('Submission', SubmissionSchema);
module.exports = Submission;