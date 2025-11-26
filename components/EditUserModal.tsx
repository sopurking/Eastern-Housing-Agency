"use client";

export default function EditUserModal({ open, user, onClose, onSave, loading }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 grid place-items-center p-4 z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl space-y-5">
        <h3 className="text-lg font-bold text-gray-800">Edit User</h3>

        {/* Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">Name</label>
          <input
            value={user.name || ""}
            onChange={(e) => onSave({ ...user, name: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg text-gray-700"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">Email</label>
          <input
            value={user.email}
            onChange={(e) => onSave({ ...user, email: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg text-gray-700"
          />
        </div>

        {/* Role */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">Role</label>
          <select
            value={user.role}
            onChange={(e) => onSave({ ...user, role: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg text-gray-700"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-gray-600"
          >
            Cancel
          </button>

          <button
            onClick={() => onSave(user)}
            disabled={loading}
            className="px-4 py-2 bg-[#2da3dd] text-white rounded-lg"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
