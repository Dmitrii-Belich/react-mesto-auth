import React from "react";

import Popup from "./Popup";

export default function PopupWithImage({ isOpen, card, onClose }) {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className="popup__image-container">
        <img alt={card.title} className="popup__image" src={card.url} />
        <h2 className="popup__image-title">{card.title}</h2>
        <button className="popup__exit-button" onClick={onClose}></button>
      </div>
    </Popup>
  );
}
