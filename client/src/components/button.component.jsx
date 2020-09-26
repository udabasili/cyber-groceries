import React from "react";

export default function CustomButton({ children, ...otherProps }) {
  return (
    <button className="custom-button" {...otherProps}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      {children}
    </button>
  );
}
