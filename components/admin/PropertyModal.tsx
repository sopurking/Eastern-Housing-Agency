"use client";

import React, { useEffect, useState } from "react";
import { X, Upload } from "lucide-react";
import { updateProperty } from "@/lib/actions/listings.actions";

const PROPERTY_TYPES = ["apartment", "house", "villa", "duplex", "land"];

export default function PropertyModal({ open, onClose, property, onUpdated }) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    state: "",
    city: "",
    location: "",
    type: "",
    price: "",
    beds: "",
    baths: "",
    featured: false,
    status: "active",
  });

  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const [newImageFiles, setNewImageFiles] = useState([]);
  const [newVideoFiles, setNewVideoFiles] = useState([]);

  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title,
        description: property.description,
        state: property.state,
        city: property.city,
        location: property.location,
        type: property.type,
        price: property.price,
        beds: property.beds || "",
        baths: property.baths || "",
        featured: property.featured,
        status: property.status || "active",
      });

      setImages(property.images || []);
      setVideos(property.videos || []);
    }
  }, [property]);

  if (!open) return null;

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? e.target.checked : value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    // Delete removed media from Cloudinary
    const removedImages = (property.images || []).filter(url => !images.includes(url));
    const removedVideos = (property.videos || []).filter(url => !videos.includes(url));
    
    for (const url of [...removedImages, ...removedVideos]) {
      await fetch('/api/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
    }

    // Upload new images
    const uploadedImages = [];
    for (const file of newImageFiles) {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('folder', 'properties');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData
      });
      
      if (!response.ok) throw new Error('Failed to upload image');
      const data = await response.json();
      uploadedImages.push(data.url);
    }

    // Upload new videos
    const uploadedVideos = [];
    for (const file of newVideoFiles) {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('folder', 'properties');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData
      });
      
      if (!response.ok) throw new Error('Failed to upload video');
      const data = await response.json();
      uploadedVideos.push(data.url);
    }

    const finalImages = [...images.filter(url => !url.startsWith('blob:')), ...uploadedImages];
    const finalVideos = [...videos.filter(url => !url.startsWith('blob:')), ...uploadedVideos];

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      payload.append(key, value.toString())
    );
    payload.append("images", JSON.stringify(finalImages));
    payload.append("videos", JSON.stringify(finalVideos));

    const result = await updateProperty(property.id, payload);

    if (result.success) {
      onUpdated();
      onClose();
    } else {
      alert(result.error);
    }
  } catch (error) {
    console.error(error);
    alert("Error updating property");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg overflow-y-auto max-h-[90vh] p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-4">Edit Property</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* BASIC INFO */}
          <div className="bg-white border rounded-lg p-4 space-y-4">
            <div>
              <label className="block font-medium mb-1 text-gray-600">Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Property title"
                className="w-full border rounded px-3 py-2 text-gray-700 placeholder:text-gray-500"
              />
            </div>

            <div>
              <label className="block font-medium mb-1 text-gray-600">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Property description"
                className="w-full border rounded px-3 py-2 text-gray-700 placeholder:text-gray-500"
              />
            </div>

            <div>
              <label className="block font-medium mb-1 text-gray-600">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2 text-gray-700"
              >
                <option value="">Select Type</option>
                {PROPERTY_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* LOCATION */}
          <div className="bg-white border rounded-lg p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1 text-gray-600">State</label>
                <input
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="Enter state"
                  className="w-full border rounded px-3 py-2 text-gray-700 placeholder:text-gray-500"
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-gray-600">City</label>
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter city"
                  className="w-full border rounded px-3 py-2 text-gray-700 placeholder:text-gray-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1 text-gray-600">Location</label>
              <input
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Street / Area"
                className="w-full border rounded px-3 py-2 text-gray-700 placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* DETAILS */}
          <div className="bg-white border rounded-lg p-4 space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block font-medium mb-1 text-gray-600">Price</label>
                <input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="w-full border rounded px-3 py-2 text-gray-700 placeholder:text-gray-500"
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-gray-600">Beds</label>
                <input
                  name="beds"
                  type="number"
                  value={formData.beds}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="w-full border rounded px-3 py-2 text-gray-700 placeholder:text-gray-500"
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-gray-600">Baths</label>
                <input
                  name="baths"
                  type="number"
                  value={formData.baths}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="w-full border rounded px-3 py-2 text-gray-700 placeholder:text-gray-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1 text-gray-600">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2 text-gray-700"
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
              />
              <span>Featured</span>
            </label>
          </div>

          {/* MEDIA */}
          <div className="bg-white border rounded-lg p-4 space-y-4">
            <h3 className="font-medium text-gray-700 mb-2">Images</h3>

            <div className="grid grid-cols-3 gap-3">
              {images.map((img, i) => (
                <div key={i} className="relative">
                  <img
                    src={img}
                    className="h-24 w-full object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setImages((prev) => prev.filter((_, idx) => idx !== i))
                    }
                    className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <label className="h-24 border rounded flex items-center justify-center cursor-pointer hover:bg-gray-100">
                <Upload className="w-6 h-6 text-gray-500" />
                <input
                  type="file"
                  className="hidden"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    const urls = files.map((f) => URL.createObjectURL(f));
                    setImages((prev) => [...prev, ...urls]);
                    setNewImageFiles((prev) => [...prev, ...files]);
                  }}
                />
              </label>
            </div>

            <h3 className="font-medium text-gray-700 mt-4 mb-2">Videos (Max 2, under 3 mins each) - {videos.length}/2</h3>

            <div className="grid grid-cols-2 gap-3">
              {videos.map((v, i) => (
                <div key={i} className="relative">
                  <video src={v} className="w-full h-32 rounded" controls />
                  <button
                    type="button"
                    onClick={() =>
                      setVideos((prev) => prev.filter((_, idx) => idx !== i))
                    }
                    className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {videos.length < 2 && (
                <label className="h-32 border rounded flex items-center justify-center cursor-pointer hover:bg-gray-100">
                  <Upload className="w-6 h-6 text-gray-500" />
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    accept="video/*"
                    onChange={(e) => {
                      const files = Array.from(e.target.files);
                      
                      // Check if adding these files would exceed the limit
                      if (videos.length + files.length > 2) {
                        alert('Maximum 2 videos allowed per listing');
                        return;
                      }
                      
                      // Check video duration
                      files.forEach(file => {
                        const videoElement = document.createElement('video');
                        videoElement.preload = 'metadata';
                        
                        videoElement.onloadedmetadata = function() {
                          window.URL.revokeObjectURL(videoElement.src);
                          const duration = videoElement.duration;
                          
                          if (duration > 180) {
                            alert(`Video "${file.name}" exceeds 3 minutes. Please upload videos under 3 minutes.`);
                          } else {
                            const url = URL.createObjectURL(file);
                            setVideos((prev) => [...prev, url]);
                            setNewVideoFiles((prev) => [...prev, file]);
                          }
                        };
                        
                        videoElement.src = URL.createObjectURL(file);
                      });
                    }}
                  />
                </label>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
              disabled={loading}
            >
              {loading ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
