import React from "react";

export default function Popup({ isOpen, onClose, children }) {
  return (
    <div className={`popup ${isOpen && "popup_display_opened"}`} >
      {children}
      <div className="popup__overlay" onClick={onClose}></div>
    </div>
  );
}
