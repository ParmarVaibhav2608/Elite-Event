const mongoose = require("mongoose");

// Booking ka dhancha (Schema) tayar kar rahe hain
const bookingSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true },
    eventType: { type: String, required: true },
    date: { type: String, required: true },
    amount: { type: String, required: true },
    status: { type: String, default: "Pending" }, // Default status humesha Pending rahega
    contact: { type: String, default: "" }, // Client ka contact information track karne ke liye
    venue: { type: String, default: "" } // Event execution platform/address save karne ke liye
  },
  { timestamps: true } // Ye automatically record karega ki booking kab create hui thi
);

// Is model ko export kar rahe hain taaki baaki files isko use kar sakein
module.exports = mongoose.model("Booking", bookingSchema);
