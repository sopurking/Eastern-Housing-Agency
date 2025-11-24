"use client";

import { X } from "lucide-react";

export default function DeleteConfirmModal({ open, onClose, onConfirm, propertyTitle }) {
  if (!open) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-3">Delete Property</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <span className="font-semibold">"{propertyTitle}"</span>? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
