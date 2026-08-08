const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      default: "Unknown Web Inquiry"
    },
    email: {
      type: String,
      default: "no-email@elite.com"
    },
    phone: {
      type: String,
      default: "0000000000"
    },
    eventType: {
      type: String,
      default: "Custom Event"
    },
    eventDate: {
      type: String,
      default: ""
    },
    notes: {
      type: String,
      default: ""
    },
    status: {
      type: String,
      default: "New"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lead", leadSchema);
