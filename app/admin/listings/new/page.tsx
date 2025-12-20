"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Upload, 
  X, 
  Home, 
  MapPin, 
  DollarSign, 
  Bed, 
  Bath, 
  Star,
  FileText,
  Camera,
  Video,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

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
    featured: false,
  });

  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoPreviews, setVideoPreviews] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({ images: 0, videos: 0 });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? e.target.checked : value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    setImages(prev => [...prev, ...files]);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews(prev => [...prev, e.target?.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files || []);
    
    // Check if adding these files would exceed the limit
    if (videos.length + files.length > 2) {
      alert('Maximum 2 videos allowed per listing');
      return;
    }
    
    // Check video duration (max 3 minutes = 180 seconds)
    const validFiles = [];
    let hasInvalidVideo = false;
    
    files.forEach(file => {
      const videoElement = document.createElement('video');
      videoElement.preload = 'metadata';
      
      videoElement.onloadedmetadata = function() {
        window.URL.revokeObjectURL(videoElement.src);
        const duration = videoElement.duration;
        
        if (duration > 180) {
          hasInvalidVideo = true;
          alert(`Video "${file.name}" exceeds 3 minutes. Please upload videos under 3 minutes.`);
        } else {
          validFiles.push(file);
          
          if (validFiles.length === files.length && !hasInvalidVideo) {
            setVideos(prev => [...prev, ...validFiles]);
            
            validFiles.forEach(validFile => {
              const reader = new FileReader();
              reader.onload = (e) => {
                setVideoPreviews(prev => [...prev, e.target?.result]);
              };
              reader.readAsDataURL(validFile);
            });
          }
        }
      };
      
      videoElement.src = URL.createObjectURL(file);
    });
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const removeVideo = (index) => {
    setVideos(prev => prev.filter((_, i) => i !== index));
    setVideoPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log('🚀 Starting property creation process');
    console.log('📝 Form data:', formData);
    console.log('🖼️ Images to upload:', images.length);
    console.log('🎥 Videos to upload:', videos.length);

    try {
      const imageUrls = [];
      console.log('📤 Starting image uploads...');
      
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        console.log(`📸 Uploading image ${i + 1}/${images.length}: ${image.name}`);
        setUploadProgress(prev => ({ ...prev, images: Math.round(((i + 1) / images.length) * 100) }));
        
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

      const videoUrls = [];
      console.log('📤 Starting video uploads...');
      
      for (let i = 0; i < videos.length; i++) {
        const video = videos[i];
        console.log(`🎬 Uploading video ${i + 1}/${videos.length}: ${video.name}`);
        setUploadProgress(prev => ({ ...prev, videos: Math.round(((i + 1) / videos.length) * 100) }));
        
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
      setUploadProgress({ images: 0, videos: 0 });
    }
  };

  const isFormValid = formData.title && formData.type && formData.state && 
                      formData.city && formData.location && formData.price && 
                      images.length > 0;

  return (
    <div className="max-w-5xl mx-auto pb-10">
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                Create New Listing
              </h1>
              <p className="text-gray-700 text-sm">Add a new property to your platform</p>
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent" />
            <span className="font-semibold text-blue-900">Creating your listing...</span>
          </div>
          {uploadProgress.images > 0 && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-blue-700">
                <span>Uploading images</span>
                <span>{uploadProgress.images}%</span>
              </div>
              <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${uploadProgress.images}%` }}
                />
              </div>
            </div>
          )}
          {uploadProgress.videos > 0 && (
            <div className="space-y-1 mt-2">
              <div className="flex justify-between text-xs text-blue-700">
                <span>Uploading videos</span>
                <span>{uploadProgress.videos}%</span>
              </div>
              <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${uploadProgress.videos}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-bold text-gray-900">Basic Information</h2>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Home className="w-4 h-4 text-blue-600" />
                  Property Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 transition-all"
                  placeholder="e.g., Luxury 4-Bedroom Duplex in Independence Layout"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Home className="w-4 h-4 text-blue-600" />
                  Property Type *
                </label>
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 transition-all"
                  placeholder="e.g., Duplex, Apartment, Bungalow, Penthouse"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FileText className="w-4 h-4 text-blue-600" />
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 transition-all resize-none"
                placeholder="Describe the property features, amenities, neighborhood, and any unique selling points..."
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-green-50 to-emerald-100 px-6 py-4 border-b border-green-200">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-green-600" />
              <h2 className="text-lg font-bold text-gray-900">Location</h2>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 text-green-600" />
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 transition-all"
                  placeholder="e.g., Enugu, Anambra, Lagos, Abuja"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 text-green-600" />
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 transition-all"
                  placeholder="e.g., Enugu, Awka, Aba, Lekki, Maitama"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <MapPin className="w-4 h-4 text-green-600" />
                Full Address *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 transition-all"
                placeholder="e.g., Plot 45, Independence Layout, Enugu"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-50 to-violet-100 px-6 py-4 border-b border-purple-200">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-purple-600" />
              <h2 className="text-lg font-bold text-gray-900">Property Details</h2>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 text-purple-600" />
                  Price (₦) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 transition-all"
                  placeholder="85000000"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Bed className="w-4 h-4 text-purple-600" />
                  Bedrooms
                </label>
                <input
                  type="number"
                  name="beds"
                  value={formData.beds}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 transition-all"
                  placeholder="4"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Bath className="w-4 h-4 text-purple-600" />
                  Bathrooms
                </label>
                <input
                  type="number"
                  name="baths"
                  value={formData.baths}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 transition-all"
                  placeholder="5"
                />
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-amber-600 border-amber-300 rounded focus:ring-amber-500"
                />
                <div className="ml-3">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-600" />
                    <span className="text-sm font-semibold text-amber-900">Featured Property</span>
                  </div>
                  <span className="text-xs text-amber-700">This property will be highlighted on the homepage</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-pink-50 to-rose-100 px-6 py-4 border-b border-pink-200">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-pink-600" />
              <h2 className="text-lg font-bold text-gray-900">Media Upload</h2>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <Camera className="w-4 h-4 text-pink-600" />
                Property Images *
                <span className="text-xs text-gray-500 font-normal">({images.length} uploaded)</span>
              </label>
              
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-blue-400 transition-colors bg-gray-50">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <Upload className="w-8 h-8 text-blue-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 mb-1">Click to upload images</span>
                  <span className="text-xs text-gray-500">PNG, JPG up to 10MB each</span>
                </label>
              </div>
              
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={preview} 
                        alt={`Preview ${index}`} 
                        className="w-full h-32 object-cover rounded-xl border-2 border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      {index === 0 && (
                        <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-md font-semibold">
                          Primary
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <Video className="w-4 h-4 text-pink-600" />
                Property Videos (Optional - Max 2, under 3 mins each)
                <span className="text-xs text-gray-500 font-normal">({videos.length}/2 uploaded)</span>
              </label>
              
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-purple-400 transition-colors bg-gray-50">
                <input
                  type="file"
                  multiple
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="hidden"
                  id="video-upload"
                  disabled={videos.length >= 2}
                />
                <label htmlFor="video-upload" className={`cursor-pointer flex flex-col items-center ${videos.length >= 2 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                    <Upload className="w-8 h-8 text-purple-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 mb-1">
                    {videos.length >= 2 ? 'Maximum videos reached' : 'Click to upload videos'}
                  </span>
                  <span className="text-xs text-gray-500">MP4, MOV - Max 2 videos, under 3 mins each</span>
                </label>
              </div>
              
              {videoPreviews.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {videoPreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <video 
                        src={preview} 
                        className="w-full h-40 object-cover rounded-xl border-2 border-gray-200" 
                        controls 
                      />
                      <button
                        type="button"
                        onClick={() => removeVideo(index)}
                        className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100"
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

        {!isFormValid && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-900 text-sm">Required Fields Missing</h3>
              <p className="text-sm text-amber-800 mt-1">
                Please fill in all required fields (*) and upload at least one image before submitting.
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            disabled={loading}
            className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading || !isFormValid}
            className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                Creating Listing...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                Create Listing
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}