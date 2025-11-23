"use client";

import { useEffect } from 'react';

export default function AuthCallback() {
  useEffect(() => {
    // Check if opened in popup
    if (window.opener) {
      window.opener.postMessage({ type: 'AUTH_SUCCESS' }, window.location.origin);
      window.close();
    } else {
      // Regular redirect
      window.location.href = '/';
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-600">Authentication successful! Redirecting...</p>
    </div>
  );
}
