"use client";

import { useState, useEffect } from 'react';

interface MiniBrowserAuthProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function MiniBrowserAuth({ isOpen, onClose, onSuccess }: MiniBrowserAuthProps) {
  useEffect(() => {
    if (!isOpen) return;

    // Listen for messages from the popup
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      
      if (event.data.type === 'AUTH_SUCCESS') {
        console.log('Authentication successful:', event.data.user);
        onSuccess?.();
        onClose();
        // Reload to update session
        setTimeout(() => window.location.reload(), 500);
      } else if (event.data.type === 'AUTH_ERROR') {
        console.error('Authentication error:', event.data.error);
        onClose();
      }
    };

    window.addEventListener('message', handleMessage);

    // Calculate center position for popup
    const width = 500;
    const height = 600;
    const left = (screen.width - width) / 2;
    const top = (screen.height - height) / 2;

    // Directly open the popup when component mounts
    const popup = window.open(
      '/api/auth/signin/google',
      'google-signin',
      `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes,status=yes,location=yes,toolbar=no,menubar=no`
    );

    // Check if popup was blocked
    if (!popup) {
      alert('Popup blocked! Please allow popups for this site.');
      onClose();
      return;
    }

    // Monitor popup closure (fallback)
    const checkClosed = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkClosed);
        onClose();
      }
    }, 1000);

    // Cleanup function
    return () => {
      window.removeEventListener('message', handleMessage);
      clearInterval(checkClosed);
      if (!popup.closed) {
        popup.close();
      }
    };
  }, [isOpen, onClose, onSuccess]);

  // Return null - no UI needed, just the popup
  return null;
}