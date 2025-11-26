"use client";

export default function DeleteUserConfirmModal({
  open,
  userName,
  onClose,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 grid place-items-center p-4 z-50">
      <div className="bg-white w-full max-w-sm rounded-xl p-6 shadow-xl space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Delete User
        </h3>

        <p className="text-gray-600">
          Are you sure you want to delete{" "}
          <span className="font-medium text-gray-800">
            {userName}
          </span>
          ? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-gray-600"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}