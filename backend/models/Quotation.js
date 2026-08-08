const mongoose = require("mongoose");

const quotationSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true },   // Kiske liye quotation hai
    eventType: { type: String, required: true },    // Event category
    basePrice: { type: Number, required: true },    // Main event execution charge
    decorationCost: { type: Number, default: 0 },   // Light/Decoration setup charge
    cateringCost: { type: Number, default: 0 },     // Food/Catering estimate per plate/total
    totalAmount: { type: Number, required: true },   // Grand Total (Base + Deco + Catering)
    status: { type: String, default: "Draft" }      // Draft, Sent, Approved, Declined
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quotation", quotationSchema);
