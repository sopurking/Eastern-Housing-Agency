"use client";
import { login } from "@/lib/actions/auth";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc"; // Google icon
import { Eye, EyeOff } from "lucide-react";

export default function SignInModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // const result = await signIn("credentials", {
    //   redirect: false,
    //   email,
    //   password,
    // });
    // if (!result?.error) onClose();
  };

  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 backdrop-blur-sm">
      <div className="relative bg-white rounded-3xl shadow-2xl p-8 w-[400px] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Sign in to access your account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 placeholder-gray-400 transition"
            required
          />

          {/* Password with Eye Toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 placeholder-gray-400 transition pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700 transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-5 gap-3">
          <hr className="flex-1 border-gray-300" />
          <span className="text-gray-400 text-sm">Or continue with</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Google Sign-In */}
        <button
          onClick={() => login()}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 hover:shadow-md transition"
        >
          <FcGoogle className="w-6 h-6" />
          <span className="text-gray-700 font-medium">Sign in with Google</span>
        </button>

        {/* Footer */}
        <p className="mt-5 text-center text-gray-500 text-sm">
          Don’t have an account?{" "}
          <a href="/auth/sign-up" className="text-orange-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
