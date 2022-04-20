import React from 'react';
import './Popup.css';

function Popup({ isOpen, children }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="scroll popup__container">
          {children}
      </div>
    </div>
  )
}

export default Popup;