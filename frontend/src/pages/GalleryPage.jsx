import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Trash2, X, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export default function GalleryPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [formData, setFormData] = useState({ imageUrl: "", category: "General" });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const API_URL = "http://localhost:5000/api/gallery";

  // STRICT COMPONENT PRIVILEGE LIFECYCLE SYNCHRONIZER
  useEffect(() => {
    const syncPrivilegeContext = () => {
      // Isolate access loops based strictly on state payloads carried over router links or persistent local admin storage
      const cameFromAdminDashboard = location.state?.fromAdmin === true;
      const adminVerified = localStorage.getItem("isAdmin") === "true";
      const authVerified = localStorage.getItem("isAuth") === "true";
      
      console.log("[Gallery Cross-Context Safe Sync]: Came From Sidebar ->", cameFromAdminDashboard, "Storage verified ->", adminVerified);
      
      // Elevate controls if explicitly initiated from an authentic admin route sequence OR if verified persistent login keys remain intact
      if (cameFromAdminDashboard || (adminVerified && authVerified)) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };

    syncPrivilegeContext();
    fetchGallery();

    window.addEventListener("storage", syncPrivilegeContext);
    return () => {
      window.removeEventListener("storage", syncPrivilegeContext);
    };
  }, [location.pathname, location.state]); // Deep dynamic hook targeting route metadata context mutations

  const fetchGallery = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setImages(data);
    } catch (error) {
      toast.error("Error loading gallery.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Smart Navigation Handler - Secure context redirection flow
  const handleNavigateBack = () => {
    if (isAdmin) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!isAdmin) {
      toast.error("Only admins can perform this action.");
      return;
    }
    try {
      let response;
      if (selectedFile) {
        const data = new FormData();
        data.append('image', selectedFile);
        data.append('category', formData.category);
        response = await fetch(API_URL, { method: 'POST', body: data });
      } else {
        response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }

      if (response.ok) {
        toast.success("Image uploaded successfully!");
        setFormData({ imageUrl: "", category: "General" });
        setSelectedFile(null);
        setShowUploadForm(false);
        fetchGallery();
      } else {
        toast.error("Failed to upload.");
      }
    } catch (error) {
      toast.error("Upload failed! Server error.");
    }
  };

  const handleDelete = async (id) => {
    if (!isAdmin) {
      toast.error("Unauthorized! Only Admin can delete.");
      return;
    }
    if (!window.confirm("Sure, ye photo permanent delete karni hai?")) return;
    
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (response.ok) {
        toast.success("Image deleted!");
        fetchGallery();
      }
    } catch (error) {
      toast.error("Delete failed.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button onClick={handleNavigateBack} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer">
            <ArrowLeft /> {isAdmin ? "Back to Dashboard" : "Back to Home"}
          </button>
          {isAdmin && (
            <button 
              onClick={() => setShowUploadForm(!showUploadForm)} 
              className="bg-rose-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-rose-700 transition-colors cursor-pointer"
            >
              <Plus size={20} /> {showUploadForm ? "Cancel Upload" : "Add New Photo"}
            </button>
          )}
        </div>

        <h1 className="text-4xl md:text-6xl font-black mb-12">Our Full <span className="text-rose-500">Gallery</span></h1>

        {isAdmin && showUploadForm && (
          <form onSubmit={handleUpload} className="bg-slate-900 p-6 rounded-xl border border-white/10 mb-8 space-y-4">
            <h3 className="text-xl font-bold">Upload New Entry</h3>
            <input type="file" accept="image/*" onChange={(e) => setSelectedFile(e.target.files[0])} className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-slate-800 file:text-white cursor-pointer" />
            <input type="text" name="imageUrl" placeholder="Or Image URL" value={formData.imageUrl} onChange={handleInputChange} className="w-full bg-slate-800 p-3 rounded-lg border border-white/10 focus:outline-none focus:border-rose-500" />
            <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleInputChange} className="w-full bg-slate-800 p-3 rounded-lg border border-white/10 focus:outline-none focus:border-rose-500" required />
            <button type="submit" className="bg-indigo-600 px-6 py-2 rounded-lg font-bold hover:bg-indigo-700 cursor-pointer">Submit Upload</button>
          </form>
        )}

        {loading ? <p>Loading...</p> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((img) => (
              <div key={img._id} className="relative group overflow-hidden rounded-xl h-64 bg-slate-900 border border-white/10">
                <img 
                  src={img.imageUrl} 
                  className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setSelectedImage(img.imageUrl)}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&auto=format&fit=crop&q=60";
                  }}
                  alt="Gallery Item"
                />
                {isAdmin && (
                  <button 
                    onClick={() => handleDelete(img._id)}
                    className="absolute top-2 right-2 bg-red-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700 cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <X className="absolute top-10 right-10 cursor-pointer" size={40} />
          <img src={selectedImage} className="max-w-full max-h-full rounded-lg shadow-2xl" alt="Zoomed" />
        </div>
      )}
    </div>
  );
}
