const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true },   // Kis client se payment aayi
    amountPaid: { type: Number, required: true },   // Kitna amount receive hua
    paymentMode: { type: String, required: true },  // UPI, Cash, Bank Transfer, Card
    transactionId: { type: String, default: "" },   // Reference/UTR No. if UPI or Bank Transfer
    paymentType: { type: String, required: true },  // Advance Payment, Part Payment, Final Settlement
    date: { type: String, required: true }          // Payment receive hone ki date
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
