"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, X } from "lucide-react";

const EASTERN_STATES = [
  { state: 'Abia', cities: ['Aba', 'Umuahia', 'Arochukwu', 'Ohafia', 'Bende'] },
  { state: 'Anambra', cities: ['Awka', 'Onitsha', 'Nnewi', 'Ekwulobia', 'Ihiala'] },
  { state: 'Ebonyi', cities: ['Abakaliki', 'Afikpo', 'Onueke', 'Ezza', 'Ishielu'] },
  { state: 'Enugu', cities: ['Enugu', 'Nsukka', 'Agbani', 'Oji River', 'Udi'] },
  { state: 'Imo', cities: ['Owerri', 'Orlu', 'Okigwe', 'Mbaise', 'Oguta'] },
];

const PROPERTY_TYPES = ['apartment', 'house', 'villa', 'duplex', 'land'];

export default function NewListingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    state: '',
    city: '',
    location: '',
    type: '',
    price: '',
    beds: '',
    baths: '',
    sqft: '',
    featured: false,
  });

  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [videoPreviews, setVideoPreviews] = useState<string[]>([]);

  const selectedStateData = EASTERN_STATES.find(s => s.state === formData.state);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      state: e.target.value,
      city: ''
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(prev => [...prev, ...files]);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setVideos(prev => [...prev, ...files]);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setVideoPreviews(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const removeVideo = (index: number) => {
    setVideos(prev => prev.filter((_, i) => i !== index));
    setVideoPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log('🚀 Starting property creation process');
    console.log('📝 Form data:', formData);
    console.log('🖼️ Images to upload:', images.length);
    console.log('🎥 Videos to upload:', videos.length);

    try {
      // Upload images using API route
      const imageUrls: string[] = [];
      console.log('📤 Starting image uploads...');
      
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        console.log(`📸 Uploading image ${i + 1}/${images.length}: ${image.name}`);
        
        const uploadFormData = new FormData();
        uploadFormData.append('file', image);
        uploadFormData.append('folder', 'properties');

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error(`❌ Image upload failed for ${image.name}:`, errorData);
          throw new Error(`Failed to upload image: ${image.name} - ${errorData.error}`);
        }
        
        const data = await response.json();
        console.log(`✅ Image uploaded successfully:`, data.url);
        imageUrls.push(data.url);
      }

      // Upload videos using API route
      const videoUrls: string[] = [];
      console.log('📤 Starting video uploads...');
      
      for (let i = 0; i < videos.length; i++) {
        const video = videos[i];
        console.log(`🎬 Uploading video ${i + 1}/${videos.length}: ${video.name}`);
        
        const uploadFormData = new FormData();
        uploadFormData.append('file', video);
        uploadFormData.append('folder', 'properties');

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error(`❌ Video upload failed for ${video.name}:`, errorData);
          throw new Error(`Failed to upload video: ${video.name} - ${errorData.error}`);
        }
        
        const data = await response.json();
        console.log(`✅ Video uploaded successfully:`, data.url);
        videoUrls.push(data.url);
      }

      console.log('📊 Final media URLs:');
      console.log('🖼️ Image URLs:', imageUrls);
      console.log('🎥 Video URLs:', videoUrls);

      // Create property using server action
      const propertyFormData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        propertyFormData.append(key, value.toString());
      });
      propertyFormData.append('images', JSON.stringify(imageUrls));
      propertyFormData.append('videos', JSON.stringify(videoUrls));

      console.log('💾 Saving property to database...');
      const { createProperty } = await import('@/lib/actions/listings.actions');
      const result = await createProperty(propertyFormData);

      console.log('📋 Database result:', result);

      if (result.error) {
        console.error('❌ Database save failed:', result.error);
        alert(result.error);
        return;
      }

      console.log('✅ Property created successfully!');
      router.push('/admin/listings');
    } catch (error) {
      console.error('💥 Error creating listing:', error);
      alert(`Failed to create listing: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create New Listing</h1>
        <p className="text-gray-600">Add a new property to the platform</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Luxury 4-Bedroom Duplex"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Type</option>
                {PROPERTY_TYPES.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe the property features, amenities, etc."
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4">Location</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleStateChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select State</option>
                {EASTERN_STATES.map(({ state }) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                disabled={!formData.state}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              >
                <option value="">Select City</option>
                {selectedStateData?.cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Address</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Independence Layout, Enugu"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4">Property Details</h2>
          
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price (₦)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="85000000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
              <input
                type="number"
                name="beds"
                value={formData.beds}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="4"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
              <input
                type="number"
                name="baths"
                value={formData.baths}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Square Feet</label>
              <input
                type="text"
                name="sqft"
                value={formData.sqft}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="3,500"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-700">Featured Property</span>
            </label>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4">Media Upload</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">Click to upload images</span>
                </label>
              </div>
              
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <img src={preview} alt={`Preview ${index}`} className="w-full h-24 object-cover rounded" />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Videos (Optional)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <input
                  type="file"
                  multiple
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="hidden"
                  id="video-upload"
                />
                <label htmlFor="video-upload" className="cursor-pointer flex flex-col items-center">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">Click to upload videos</span>
                </label>
              </div>
              
              {videoPreviews.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {videoPreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <video src={preview} className="w-full h-32 object-cover rounded" controls />
                      <button
                        type="button"
                        onClick={() => removeVideo(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Listing'}
          </button>
        </div>
      </form>
    </div>
  );
}