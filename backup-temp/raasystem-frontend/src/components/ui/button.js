import React from 'react';
import { toast } from 'sonner';  // Importing toast from sonner

export const Button = ({ children, onClick, className = "", type = "button" }) => {
  // Handle button click
  const handleClick = () => {
    // Trigger the passed onClick function (if any)
    if (onClick) onClick();

    // Show toast when button is clicked
    toast.success("Button clicked!"); // You can customize this message
  };

  return (
    <button
      type={type}
      onClick={handleClick}  // Use the new handleClick function
      className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 ${className}`}
    >
      {children}
    </button>
  );
};
