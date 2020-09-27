import React from "react";

import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onDelete }) {
  const [buttonText, setButtonText] = React.useState("Да");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setButtonText("Удаление...");
    onDelete()
      .then(() => {
        setButtonText("Да");
      })
      .catch(() => {
        setButtonText("Ошибка");
      });
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Вы уверены?"
      name="delete"
      buttonText={buttonText}
      onSubmit={handleSubmit}
      isFormValid
    ></PopupWithForm>
  );
}
