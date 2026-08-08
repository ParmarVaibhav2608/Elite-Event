const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  imageUrl: { 
    type: String, 
    required: [true, 'Image URL is required'], 
    trim: true 
  },
  category: { 
    type: String, 
    default: 'General', 
    trim: true,
    lowercase: true
  }
}, { 
  timestamps: true // Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('Gallery', gallerySchema);
