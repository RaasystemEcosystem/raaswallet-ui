import React from 'react';

export const Input = ({ value, onChange, type = "text", placeholder = "", className = "" }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border rounded px-3 py-2 w-full ${className}`}
    />
  );
};
