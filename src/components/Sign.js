import React from "react";
import { Link } from "react-router-dom";

import Input from "./ui/Input";

export default function Sign({ type, onSubmit }) {
  const [buttonText, setButtonText] = React.useState(
    type === "in" ? "Войти" : "Зарегестрироваться"
  );
  const [validity, setValidity] = React.useState({
    email: false,
    password: false,
  });
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const inputChangers = {
    email: setEmail,
    password: setPassword,
  };

  const inputHandler = (value, name, inputValidity) => {
    inputChangers[name](value);
    const newValidity = Object.assign({}, validity);
    newValidity[name] = inputValidity;
    setValidity(newValidity);
  };

  const clearInput = () => {
    setTimeout(() => {
      setEmail("");
      setPassword("");
      setValidity({ title: false, url: false });
      setButtonText(type === "in" ? "Войти" : "Зарегестрироваться");
    }, 200);
  };

  const isFormValid = () => {
    return Object.values(validity).reduce((summ, currentItem) => {
      return summ && currentItem;
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setButtonText(type === "in" ? "Вход..." : "Регистрация...");
    onSubmit({
      password,
      email,
    })
       .then((check) => {
        if (!check) clearInput();
      })
      .catch(() => {
        setButtonText("Попробовать еще раз");
      }); 
  };
  return (
    <main>
      <form onSubmit={handleSubmit} className="sign">
        <h1 className="sign__title">
          {type === "in" ? "Вход" : "Регистрация"}
        </h1>
        <Input
          place="sign"
          placeholder="Email"
          type="email"
          name="email"
          value={email || ""}
          onChange={inputHandler}
          required
        />
        <Input
          place="sign"
          placeholder="Пароль"
          type="password"
          name="password"
          value={password || ""}
          onChange={inputHandler}
          minLength="3"
          maxLength="20"
           pattern="[\d\w]*" 
          required
        />
        <button
          type="submit"
          className={`sign__button ${
            !isFormValid() && "sign__button_display_error"
          }`}
          disabled={!isFormValid() && "disabled"}
        >
          {buttonText}
        </button>
        <p className="sign__subtitle">
          {type === "in"
            ? "Ещё не зарегистрированы? "
            : "Уже зарегистрированы? "}
          <Link
            className="sign__link"
            to={type === "in" ? "/sign-up" : "/sign-in"}
          >
            {type === "in" ? "Регистрация" : "Войти"}
          </Link>
        </p>
      </form>
    </main>
  );
}
