import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  vote: {
    type: Number,
    required: true,
    default: 0,
  },
  uuid: {
    type: String,
    required: true,
  },
});

const poolSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  validity: {
    type: String,
    required: true,
  },
  questions: [questionSchema],
  clerk_id: {
    type: String,
    required: true,
    ref: "User",
  },
});

const Pool = mongoose.models.Pool || mongoose.model("Pool", poolSchema);

export default Pool;
