const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  salary: { type: Number, required: true }, 
  advancePaid: { type: Number, default: 0 },
  currentTask: { type: String, default: "No task" }
}, { timestamps: true });

module.exports = mongoose.model("Staff", staffSchema);
