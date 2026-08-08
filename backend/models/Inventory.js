const mongoose = require("mongoose");
const inventorySchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  totalStock: { type: Number, required: true },
  onSite: { type: Number, default: 0 },
  faulty: { type: Number, default: 0 }
});
module.exports = mongoose.model("Inventory", inventorySchema);
