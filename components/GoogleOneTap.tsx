"use client";

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          prompt: () => void;
        };
      };
    };
  }
}

interface GoogleOneTapProps {
  onSuccess?: () => void;
}

export default function GoogleOneTap({ onSuccess }: GoogleOneTapProps) {
  const { data: session, status } = useSession();

  useEffect(() => {
    // Only show One Tap if user is not authenticated and session is loaded
    if (status === 'loading' || session?.user) return;

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.google?.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        callback: async (response: any) => {
          try {
            const res = await fetch('/api/auth/google-signin', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ credential: response.credential })
            });
            
            if (res.ok) {
              onSuccess?.();
              window.location.reload();
            }
          } catch (error) {
            console.error('One Tap auth error:', error);
          }
        }
      });

      window.google?.accounts.id.prompt();
    };

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [onSuccess, session, status]);

  return null;
}