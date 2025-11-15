"use client";
import { useState } from "react";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";

export default function AuthModalManager() {
  const [isSignIn, setIsSignIn] = useState(true); // true = SignIn, false = SignUp
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Button to open modal */}
      <button onClick={() => setIsOpen(true)}>Open Auth Modal</button>

      {isOpen && (
        <>
          {isSignIn ? (
            <SignInModal
              onClose={() => setIsOpen(false)}
              onSwitch={() => setIsSignIn(false)}
            />
          ) : (
            <SignUpModal
              onClose={() => setIsOpen(false)}
              onSwitch={() => setIsSignIn(true)}
            />
          )}
        </>
      )}
    </>
  );
}
