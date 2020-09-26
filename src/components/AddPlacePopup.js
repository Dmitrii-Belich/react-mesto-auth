import React from "react";

import Input from "./ui/Input";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [buttonText, setButtonText] = React.useState("Создать");
  const [validity, setValidity] = React.useState({ title: false, url: false });
  const [title, setTitle] = React.useState("");
  const [url, setUrl] = React.useState("");

  const inputChangers = {
    title: setTitle,
    url: setUrl,
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setButtonText("Создание...");

    onAddPlace({ name: title, link: url })
      .then(() => {
        clearInput();
      })
      .catch(() => {
        setButtonText("Ошибка");
      });
  };

  const inputHandler = (value, name, inputValidity) => {
    inputChangers[name](value);
    const newValidity = Object.assign({}, validity);
    newValidity[name] = inputValidity;
    setValidity(newValidity);
  };

  const clearInput = () => {
    setTimeout(() => {
      setUrl("");
      setTitle("");
      setValidity({ title: false, url: false });
      setButtonText("Создать");
    }, 200);
  };

  const isFormValid = () => {
    return Object.values(validity).reduce((summ, currentItem) => {
      return summ && currentItem;
    });
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={() => {
        onClose();
        clearInput();
      }}
      title="Новое место"
      name="add"
      buttonText={buttonText}
      onSubmit={handleSubmit}
      isFormValid={isFormValid()}
    >
      <Input
        type="text"
        className="popup__input"
        name="title"
        required
        placeholder="Название"
        minLength="1"
        maxLength="30"
        value={title || ""}
        update={isOpen}
        onChange={inputHandler}
      />
      <Input
        type="url"
        className="popup__input"
        name="url"
        required
        placeholder="Ссылка на картинку"
        update={isOpen}
        value={url || ""}
        onChange={inputHandler}
      />
    </PopupWithForm>
  );
}
