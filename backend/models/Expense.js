const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },       // Kis cheez par kharcha hua (e.g., Catering, Light Decoration)
    amount: { type: Number, required: true },      // Kitna paisa kharch hua
    category: { type: String, required: true },    // Vendor, Daily Wage, Food, Rental, Logistics
    date: { type: String, required: true },        // Kharch hone ki tareekh
    notes: { type: String, default: "" }          // Koi extra details/bill description
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);
