"use client";

import { SessionProvider } from 'next-auth/react';
import GoogleOneTap from './GoogleOneTap';

interface ClientWrapperProps {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  return (
    <SessionProvider>
      <GoogleOneTap />
      {children}
    </SessionProvider>
  );
}