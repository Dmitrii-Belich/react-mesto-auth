import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import Input from "./ui/Input";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [validity, setValidity] = React.useState({
    name: true,
    description: true,
  });
  const [buttonText, setButtonText] = React.useState("Сохранить");
  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);

  React.useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  const inputChangers = {
    name: setName,
    description: setDescription,
  };

  const inputHandler = (value, name, inputValidity) => {
    inputChangers[name](value);
    const newValidity = Object.assign({}, validity);
    newValidity[name] = inputValidity;
    setValidity(newValidity);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setButtonText("Сохранение...");
    onUpdateUser({
      name,
      about: description,
    })
      .then(() => {
        clearInput();
      })
      .catch(() => {
        setButtonText("Ошибка");
      });
  };

  const clearInput = () => {
    setTimeout(() => {
      setValidity({ name: true, description: true });
      setButtonText("Сохранить");
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
      title="Редактировать профиль"
      name="edit"
      buttonText={buttonText}
      onSubmit={handleSubmit}
      isFormValid={isFormValid()}
    >
      <Input
        type="text"
        className="popup__input"
        name="name"
        required
        minLength="2"
        maxLength="40"
        pattern="[ёЁА-Яа-яA-Za-z -]{1,}"
        value={name || ""}
        update={isOpen}
        onChange={inputHandler}
      />
      <Input
        type="text"
        className="popup__input"
        name="description"
        required
        minLength="2"
        maxLength="200"
        update={isOpen}
        value={description || ""}
        onChange={inputHandler}
      />
    </PopupWithForm>
  );
}
