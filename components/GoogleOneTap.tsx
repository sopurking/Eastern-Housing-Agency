"use client";

import { useEffect } from 'react';

declare global {
  interface Window {
    google: any;
  }
}

interface GoogleOneTapProps {
  onSuccess?: () => void;
}

export default function GoogleOneTap({ onSuccess }: GoogleOneTapProps) {
  useEffect(() => {
    console.log('[GoogleOneTap] Component mounted');
    
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      console.log('[GoogleOneTap] Google script loaded');
      
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: '306046224756-vdtn1r7jgpdahd64bo6b9gvo79alaros.apps.googleusercontent.com',
          callback: handleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        console.log('[GoogleOneTap] Showing One Tap prompt');
        window.google.accounts.id.prompt((notification: any) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            console.log('[GoogleOneTap] Prompt not displayed:', notification.getNotDisplayedReason());
          }
        });
      }
    };

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const handleCredentialResponse = async (response: any) => {
    console.log('[GoogleOneTap] Credential received, processing...');
    
    try {
      console.log('[GoogleOneTap] Sending credential to backend');
      const res = await fetch('/api/auth/google-one-tap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          credential: response.credential,
        }),
      });

      console.log('[GoogleOneTap] Backend response status:', res.status);
      const data = await res.json();
      console.log('[GoogleOneTap] Backend response data:', data);

      if (res.ok) {
        console.log('[GoogleOneTap] Authentication successful, reloading page');
        onSuccess?.();
        window.location.reload();
      } else {
        console.error('[GoogleOneTap] Authentication failed:', data);
      }
    } catch (error) {
      console.error('[GoogleOneTap] Error during authentication:', error);
    }
  };

  return null;
}