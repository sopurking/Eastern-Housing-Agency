"use client";

import React, { useEffect, useState } from "react";
import { X, Upload } from "lucide-react";
import { updateProperty } from "@/lib/actions/listings.actions";

const EASTERN_STATES = [
  { state: 'Abia', cities: ['Aba', 'Umuahia', 'Arochukwu', 'Ohafia', 'Bende'] },
  { state: 'Anambra', cities: ['Awka', 'Onitsha', 'Nnewi', 'Ekwulobia', 'Ihiala'] },
  { state: 'Ebonyi', cities: ['Abakaliki', 'Afikpo', 'Onueke', 'Ezza', 'Ishielu'] },
  { state: 'Enugu', cities: ['Enugu', 'Nsukka', 'Agbani', 'Oji River', 'Udi'] },
  { state: 'Imo', cities: ['Owerri', 'Orlu', 'Okigwe', 'Mbaise', 'Oguta'] },
];

const PROPERTY_TYPES = ['apartment', 'house', 'villa', 'duplex', 'land'];

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

  const [imagePreviews] = useState(property.images || []);
  const [videoPreviews] = useState(property.videos || []);

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
    }
  }, [property]);

  if (!open) return null;

  const selectedStateData = EASTERN_STATES.find(
    (s) => s.state === formData.state
  );

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? e.target.checked : value,
    }));
  };

  const handleStateChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      state: e.target.value,
      city: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = new FormData();
    Object.entries(formData).forEach(([k, v]) =>
      payload.append(k, v.toString())
    );

    payload.append("images", JSON.stringify(property.images));
    payload.append("videos", JSON.stringify(property.videos));

    const result = await updateProperty(property.id, payload);

    if (result.success) {
      onUpdated();   // refresh table instantly
      onClose();
    } else {
      alert(result.error);
    }

    setLoading(false);
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

        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Edit Property
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* BASIC INFO */}
          <div className="bg-white border rounded-lg p-4 space-y-4">
            <div>
              <label className="block font-medium mb-1 text-gray-600">Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-medium mb-1 text-gray-600">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-medium mb-1 text-gray-600">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
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
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleStateChange}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Select State</option>
                  {EASTERN_STATES.map((s) => (
                    <option key={s.state} value={s.state}>
                      {s.state}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium mb-1 text-gray-600">City</label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  disabled={!formData.state}
                >
                  <option value="">Select City</option>
                  {selectedStateData?.cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1 text-gray-600">Location</label>
              <input
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
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
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-gray-600">Beds</label>
                <input
                  name="beds"
                  type="number"
                  value={formData.beds}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-gray-600">Baths</label>
                <input
                  name="baths"
                  type="number"
                  value={formData.baths}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1 text-gray-600">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
              />
              <span>Featured</span>
            </label>
          </div>

          {/* MEDIA (READ-ONLY LIST) */}
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-medium mb-2 text-gray-700">Images</h3>
            <div className="grid grid-cols-3 gap-3">
              {imagePreviews.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="h-24 w-full object-cover rounded"
                />
              ))}
            </div>

            <h3 className="font-medium mt-4 mb-2 text-gray-700">
              Videos
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {videoPreviews.map((v, i) => (
                <video
                  key={i}
                  src={v}
                  className="w-full h-32 rounded"
                  controls
                />
              ))}
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
