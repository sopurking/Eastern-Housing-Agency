"use client";

import { useEffect } from "react";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  useEffect(() => {
    // Immediately redirect to Google OAuth without showing any UI
    signIn('google', {
      callbackUrl: '/auth/callback',
      redirect: true,
    });
  }, []);

  // Return minimal loading state while redirecting
  return null;
}