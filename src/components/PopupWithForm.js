import React from "react";

import Popup from "./Popup";

export default function PopupWithForm({
  isOpen,
  onClose,
  onSubmit,
  title,
  buttonText,
  children,
  name,
  isFormValid,
}) {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <form
        className="popup__container"
        name={name}
        noValidate
        onSubmit={onSubmit}
      >
        <h2 className="popup__title">{title}</h2>
        {children}
        <button
          type="submit"
          className={`popup__save ${
            !isFormValid && "popup__save_display_error"
          }`}
          disabled={!isFormValid && "disabled"}
        >
          {buttonText}
        </button>
        <button
          type="button"
          className="popup__exit-button"
          onClick={onClose}
        ></button>
      </form>
    </Popup>
  );
}
