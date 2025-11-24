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
    console.log('[MiniBrowser] Opening authentication popup');

    const handleMessage = (event: MessageEvent) => {
      console.log('[MiniBrowser] Message received:', event.data);
      if (event.origin !== window.location.origin) {
        console.log('[MiniBrowser] Message from different origin, ignoring');
        return;
      }
      
      if (event.data.type === 'AUTH_SUCCESS') {
        console.log('[MiniBrowser] Authentication successful:', event.data.user);
        onSuccess?.();
        onClose();
        setTimeout(() => window.location.reload(), 500);
      } else if (event.data.type === 'AUTH_ERROR') {
        console.error('[MiniBrowser] Authentication error:', event.data.error);
        onClose();
      }
    };

    window.addEventListener('message', handleMessage);

    const width = 500;
    const height = 600;
    const left = (screen.width - width) / 2;
    const top = (screen.height - height) / 2;

    console.log('[MiniBrowser] Opening popup window');
    const popup = window.open(
      '/api/auth/signin/google',
      'google-signin',
      `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes,status=yes,location=yes,toolbar=no,menubar=no`
    );

    if (!popup) {
      console.error('[MiniBrowser] Popup blocked');
      alert('Popup blocked! Please allow popups for this site.');
      onClose();
      return;
    }
    console.log('[MiniBrowser] Popup opened successfully');

    const checkClosed = setInterval(() => {
      if (popup.closed) {
        console.log('[MiniBrowser] Popup closed by user');
        clearInterval(checkClosed);
        onClose();
      }
    }, 1000);

    return () => {
      console.log('[MiniBrowser] Cleanup');
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