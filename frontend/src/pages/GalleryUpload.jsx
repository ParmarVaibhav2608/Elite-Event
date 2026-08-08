import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function GalleryUpload() {
  const [formData, setFormData] = useState({ imageUrl: "", category: "General" });
  const [selectedFile, setSelectedFile] = useState(null);
  
  // Base URL for the backend API
  const API_BASE_URL = "http://localhost:5000";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    try {
      let response;
      
      if (selectedFile) {
        // Handle File Upload using FormData
        const data = new FormData();
        data.append('image', selectedFile);
        data.append('category', formData.category);
        
        response = await fetch(`${API_BASE_URL}/api/gallery`, {
          method: 'POST',
          body: data, // Browser automatically sets Content-Type to multipart/form-data
        });
      } else {
        // Handle URL Upload using JSON
        response = await fetch(`${API_BASE_URL}/api/gallery`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }

      if (response.ok) {
        toast.success("Photo details uploaded successfully!");
        setFormData({ imageUrl: "", category: "General" });
        setSelectedFile(null);
      } else {
        toast.error("Failed to upload photo details.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed! Server error.");
    }
  };

  return (
    <div className="p-8 bg-slate-900 rounded-xl border border-white/10">
      <h2 className="text-2xl font-bold mb-6 text-white">Upload New Photo Entry</h2>
      <form onSubmit={handleUpload} className="flex flex-col gap-4">
        <input 
          type="text" 
          name="imageUrl"
          placeholder="Image URL (e.g., https://images.unsplash.com/...)"
          value={formData.imageUrl}
          onChange={handleInputChange}
          autoComplete="off"
          className="bg-slate-800 text-white p-3 rounded-lg border border-white/10 focus:outline-none focus:border-rose-500 w-full"
        />
        
        <div className="text-slate-400 text-sm font-semibold">OR select file:</div>
        
        <input 
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="bg-slate-800 text-white p-3 rounded-lg border border-white/10 focus:outline-none focus:border-rose-500 w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-rose-600 file:text-white hover:file:bg-rose-700"
        />

        <input 
          type="text" 
          name="category"
          placeholder="Category (e.g., Wedding, Corporate)"
          value={formData.category}
          onChange={handleInputChange}
          autoComplete="off"
          className="bg-slate-800 text-white p-3 rounded-lg border border-white/10 focus:outline-none focus:border-rose-500 w-full"
          required
        />
        <button type="submit" className="bg-rose-600 px-6 py-3 rounded text-white font-bold hover:bg-rose-700 transition-colors">
          Add to Gallery
        </button>
      </form>
    </div>
  );
}
