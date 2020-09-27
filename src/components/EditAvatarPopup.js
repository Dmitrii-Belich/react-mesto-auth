import React from "react";

import Input from "./ui/Input";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [buttonText, setButtonText] = React.useState("Сохранить");
  const [validity, setValidity] = React.useState(false);
  const [url, setUrl] = React.useState("");

  const inputHandler = (value, name, validity) => {
    setUrl(value);
    setValidity(validity);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setButtonText("Сохранение...");
    onUpdateAvatar(url)
      .then(() => {
        clearInput();
      })
      .catch(() => {
        setButtonText("Ошибка");
      });
  };

  const clearInput = () => {
    setTimeout(() => {
      setUrl("");
      setButtonText("Сохранить");
    }, 200);
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={() => {
        onClose();
        clearInput();
      }}
      title="Обновить аватар"
      name="avatar"
      buttonText={buttonText}
      onSubmit={handleSubmit}
      isFormValid={validity}
    >
      <Input
        type="url"
        className="popup__input"
        pattern=".+\.(jpg|png)"
        name="avatar"
        required
        placeholder="Введите ссылку"
        value={url}
        update={isOpen}
        onChange={inputHandler}
      />
    </PopupWithForm>
  );
}
