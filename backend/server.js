const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Booking = require("./models/Booking"); 
const Staff = require("./models/Staff");
const Inventory = require("./models/Inventory");
const Gallery = require("./models/Gallery");
const Lead = require("./models/Lead");

// Importing New Financial ERP Enterprise Models
const Expense = require("./models/Expense");
const Quotation = require("./models/Quotation");
const Payment = require("./models/Payment");

dotenv.config();
const app = express();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Configure Multer for File Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// CORS configuration
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
// Serve static files from uploads folder
app.use('/uploads', express.static('uploads'));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch((error) => console.log("❌ MongoDB Connection Error: ", error));

// --- 1. ADMIN LOGIN ROUTE ---
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const ADMIN_EMAIL = "admin@eliteevent.com";
  const ADMIN_PASS = "admin123";

  if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
    res.status(200).json({ 
      success: true, 
      message: "Login Successful!",
      isAdmin: true,
      role: "admin"
    });
  } else {
    res.status(401).json({ success: false, message: "Galat Email ya Password!" });
  }
});

// --- 2. BOOKINGS APIs (CRUD) ---
app.get("/api/bookings", async (req, res) => {
  try { const bookings = await Booking.find(); res.status(200).json(bookings); }
  catch (error) { res.status(500).json({ message: "Error fetch bookings", error }); }
});

app.post("/api/bookings", async (req, res) => {
  try { 
    const bookingData = { ...req.body, status: req.body.status || "Pending" };
    const newBooking = new Booking(bookingData); 
    const savedBooking = await newBooking.save(); 
    res.status(201).json(savedBooking); 
  }
  catch (error) { res.status(500).json({ message: "Error saving booking", error }); }
});

app.put("/api/bookings/:id", async (req, res) => {
  try { const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true }); res.status(200).json(updatedBooking); }
  catch (error) { res.status(500).json({ message: "Error updating status", error }); }
});

app.delete("/api/bookings/:id", async (req, res) => {
  try { await Booking.findByIdAndDelete(req.params.id); res.status(200).json({ message: "Deleted successfully" }); }
  catch (error) { res.status(500).json({ message: "Error deleting booking", error }); }
});

// --- 3. STAFF / PAYROLL APIs (CRUD) ---
app.get("/api/staff", async (req, res) => {
  try { const staffMembers = await Staff.find(); res.status(200).json(staffMembers); }
  catch (error) { res.status(500).json({ message: "Error fetching staff", error }); }
});

app.post("/api/staff", async (req, res) => {
  try { const newWorker = new Staff(req.body); const savedWorker = await newWorker.save(); res.status(201).json(savedWorker); }
  catch (error) { res.status(500).json({ message: "Error saving worker", error }); }
});

app.put("/api/staff/:id", async (req, res) => {
  try { const updatedWorker = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.status(200).json(updatedWorker); }
  catch (error) { res.status(500).json({ message: "Error updating staff", error }); }
});

app.delete("/api/staff/:id", async (req, res) => {
  try { await Staff.findByIdAndDelete(req.params.id); res.status(200).json({ message: "Worker removed" }); }
  catch (error) { res.status(500).json({ message: "Error deleting worker", error }); }
});

// --- 4. INVENTORY APIs (CRUD) ---
app.get("/api/inventory", async (req, res) => {
  try { const items = await Inventory.find(); res.status(200).json(items); }
  catch (error) { res.status(500).json({ message: "Error fetching inventory", error }); }
});

app.post("/api/inventory", async (req, res) => {
  try { const newItem = new Inventory(req.body); const savedItem = await newItem.save(); res.status(201).json(savedItem); }
  catch (error) { res.status(500).json({ message: "Error saving item", error }); }
});

app.put("/api/inventory/:id", async (req, res) => {
  try { const updatedItem = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.status(200).json(updatedItem); }
  catch (error) { res.status(500).json({ message: "Error updating item", error }); }
});

app.delete("/api/inventory/:id", async (req, res) => {
  try { await Inventory.findByIdAndDelete(req.params.id); res.status(200).json({ message: "Item deleted" }); }
  catch (error) { res.status(500).json({ message: "Error deleting item", error }); }
});

// --- 5. GALLERY APIs (CRUD with File Upload) ---
app.get("/api/gallery", async (req, res) => {
  try { const images = await Gallery.find(); res.status(200).json(images); }
  catch (error) { res.status(500).json({ message: "Error fetching gallery", error }); }
});

app.post("/api/gallery", upload.single('image'), async (req, res) => {
  try {
    const imageUrl = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : req.body.imageUrl;
    const newImage = new Gallery({ imageUrl, category: req.body.category });
    const savedImage = await newImage.save();
    res.status(201).json(savedImage);
  }
  catch (error) { res.status(500).json({ message: "Error saving image", error }); }
});

app.delete("/api/gallery/:id", async (req, res) => {
  try { await Gallery.findByIdAndDelete(req.params.id); res.status(200).json({ message: "Image deleted successfully" }); }
  catch (error) { res.status(500).json({ message: "Error deleting image", error }); }
});

// --- 6. LEAD MANAGEMENT MODULE APIs ---
app.get("/api/leads", async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: "Error fetching leads collection", error });
  }
});

app.post("/api/leads", async (req, res) => {
  try {
    // Adaptive parsing layer maps client variables seamlessly to avoid schema constraints validation failure
    const leadData = {
      clientName: req.body.clientName || req.body.name || "Unknown Web Inquiry",
      email: req.body.email || "no-email@elite.com",
      phone: req.body.phone || req.body.contact || "0000000000",
      eventType: req.body.eventType || "Custom Event",
      eventDate: req.body.eventDate || req.body.date || new Date().toISOString().split('T')[0],
      notes: req.body.notes || req.body.venue || "",
      status: "New"
    };
    
    const newLead = new Lead(leadData);
    const savedLead = await newLead.save();
    res.status(201).json(savedLead);
  } catch (error) {
    console.error("Failsafe controller intercept:", error);
    res.status(500).json({ message: "Error creating lead entry", error });
  }
});

app.delete("/api/leads/:id", async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Lead entry cleared cleanly from registry" });
  } catch (error) {
    res.status(500).json({ message: "Error removing lead", error });
  }
});

// --- 7. PUBLIC BOOKING/LEAD TRACKING ENDPOINT ---
app.get("/api/public/track/:phone", async (req, res) => {
  try {
    const searchPhone = req.params.phone;
    
    // Check inside confirmed Bookings collection first
    const confirmedBooking = await Booking.findOne({ contact: searchPhone });
    if (confirmedBooking) {
      return res.status(200).json({
        found: true,
        clientName: confirmedBooking.clientName,
        eventType: confirmedBooking.eventType,
        date: confirmedBooking.date,
        status: "Approved & Confirmed 🟢",
        type: "Booking"
      });
    }

    // Fallback search to raw Inbound Leads collection if booking is absent
    const rawLead = await Lead.findOne({ phone: searchPhone });
    if (rawLead) {
      return res.status(200).json({
        found: true,
        clientName: rawLead.clientName,
        eventType: rawLead.eventType,
        date: rawLead.eventDate,
        status: "Pending Review 🟡 (Team will contact you soon)",
        type: "Inquiry"
      });
    }

    // No documents matching search criteria across both data layers
    return res.status(200).json({ found: false, message: "No record found with this contact number." });

  } catch (error) {
    res.status(500).json({ message: "Error tracking status data metrics", error });
  }
});

// --- 8. EXPENSE MODULE APIs (CRUD) ---
app.get("/api/expenses", async (req, res) => {
  try { const expenses = await Expense.find().sort({ createdAt: -1 }); res.status(200).json(expenses); }
  catch (error) { res.status(500).json({ message: "Error fetching expenses", error }); }
});

app.post("/api/expenses", async (req, res) => {
  try {
    const newExpense = new Expense(req.body);
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (error) { res.status(500).json({ message: "Error saving expense metrics", error }); }
});

app.put("/api/expenses/:id", async (req, res) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedExpense);
  } catch (error) { res.status(500).json({ message: "Error updating expense document", error }); }
});

app.delete("/api/expenses/:id", async (req, res) => {
  try { await Expense.findByIdAndDelete(req.params.id); res.status(200).json({ message: "Expense record removed successfully" }); }
  catch (error) { res.status(500).json({ message: "Error deleting expense trace", error }); }
});

// --- 9. QUOTATION MODULE APIs (CRUD) ---
app.get("/api/quotations", async (req, res) => {
  try { const quotations = await Quotation.find().sort({ createdAt: -1 }); res.status(200).json(quotations); }
  catch (error) { res.status(500).json({ message: "Error fetching quotations stack", error }); }
});

app.post("/api/quotations", async (req, res) => {
  try {
    const newQuotation = new Quotation(req.body);
    const savedQuotation = await newQuotation.save();
    res.status(201).json(savedQuotation);
  } catch (error) { res.status(500).json({ message: "Error establishing quotation layout", error }); }
});

app.put("/api/quotations/:id", async (req, res) => {
  try {
    const updatedQuotation = await Quotation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedQuotation);
  } catch (error) { res.status(500).json({ message: "Error altering quotation parameters", error }); }
});

  app.delete("/api/quotations/:id", async (req, res) => {
  try { await Quotation.findByIdAndDelete(req.params.id); res.status(200).json({ message: "Quotation scrubbed cleanly" }); }
  catch (error) { res.status(500).json({ message: "Error destroying quotation", error }); }
});

// --- 10. PAYMENTS MODULE APIs (CRUD) ---
app.get("/api/payments", async (req, res) => {
  try { const payments = await Payment.find().sort({ createdAt: -1 }); res.status(200).json(payments); }
  catch (error) { res.status(500).json({ message: "Error tracking dynamic payments registry", error }); }
});

app.post("/api/payments", async (req, res) => {
  try {
    const newPayment = new Payment(req.body);
    const savedPayment = await newPayment.save();
    res.status(201).json(savedPayment);
  } catch (error) { res.status(500).json({ message: "Error writing billing payment log", error }); }
});

app.put("/api/payments/:id", async (req, res) => {
  try {
    const updatedPayment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedPayment);
  } catch (error) { res.status(500).json({ message: "Error patching transaction record", error }); }
});

app.delete("/api/payments/:id", async (req, res) => {
  try { await Payment.findByIdAndDelete(req.params.id); res.status(200).json({ message: "Transaction log truncated" }); }
  catch (error) { res.status(500).json({ message: "Error terminating transaction data row", error }); }
});

app.get("/", (req, res) => res.send("Elite ERP Backend is Running perfectly! 🚀"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server is running on http://localhost:${PORT}`));
