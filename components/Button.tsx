import React from 'react';

// --- Reusable Button Component ---
// This button is styled with our primary color and is used in Header and SearchForm.

const Button = ({ children, className = '', ...props }) => (
  <button
    className={`inline-flex items-center justify-center text-sm shadow-sm
                bg-indigo-600 text-white
                hover:bg-indigo-700
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                py-2 px-4 rounded-md font-medium transition duration-150 ease-in-out ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
