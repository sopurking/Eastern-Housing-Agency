"use client";

interface AuthPopupProps {
  type: 'signin' | 'signup';
}

export default function AuthPopup({ type }: AuthPopupProps) {
  const openAuthPopup = () => {
    const width = 500;
    const height = 600;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;

    const popup = window.open(
      `/api/auth/signin/google?popup=true&type=${type}`,
      'googleAuth',
      `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
    );

    // Listen for popup completion
    const checkClosed = setInterval(() => {
      if (popup?.closed) {
        clearInterval(checkClosed);
        // Refresh the main window to update auth state
        window.location.reload();
      }
    }, 1000);

    // Handle message from popup
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      
      if (event.data.type === 'AUTH_SUCCESS') {
        popup?.close();
        clearInterval(checkClosed);
        window.location.reload();
      }
    };

    window.addEventListener('message', handleMessage);

    // Cleanup
    setTimeout(() => {
      clearInterval(checkClosed);
      window.removeEventListener('message', handleMessage);
    }, 300000); // 5 minutes timeout
  };

  return { openAuthPopup };
}