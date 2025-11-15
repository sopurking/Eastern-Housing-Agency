"use client";

import { login } from "@/lib/actions/auth";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { HiEye, HiEyeOff } from "react-icons/hi";
import AuthModalManager from "./AuthModalManager";

export default function SignUpModal({
  onClose,
  onSwitch,
}: {
  onClose?: () => void;
  onSwitch?: () => void;
}) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // const res = await fetch("/api/auth/signup", {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name:firstName, password }),
    });

    const data = await res.json();
    console.log(data)

    if (res.ok) {
      alert("Account created successfully!");
      setEmail("");
      setFirstName("");
      setPassword("");
      setConfirmPassword("");
      if(onClose) onClose();
      window.location.reload();
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-[400px] flex flex-col relative">
        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Create Account
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Sign up to start your journey with us
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Names */}
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="First and Last Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 placeholder-gray-400 transition"
              required
            />
          </div>

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 placeholder-gray-400 transition"
            required
          />

          {/* Passwords */}
          <div className="flex gap-4">
            <div className="relative w-1/2">
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
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <HiEyeOff /> : <HiEye />}
              </button>
            </div>
            <div className="relative w-1/2">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 placeholder-gray-400 transition pr-10"
                required
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? <HiEyeOff /> : <HiEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition"
          >
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-5 gap-3">
          <hr className="flex-1 border-gray-300" />
          <span className="text-gray-400 text-sm">Or continue with</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Google Sign-Up */}
        <button
          onClick={() => login()}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 hover:shadow-md transition"
        >
          <FcGoogle className="w-6 h-6" />
          <span className="text-gray-700 font-medium">Sign up with Google</span>
        </button>

        {/* Footer */}
        <p className="mt-5 text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <a href="/auth/sign-in" className="text-orange-500 hover:underline">
            Sign In
          </a>
        </p>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
