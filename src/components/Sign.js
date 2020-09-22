import React from "react";
import { Link } from "react-router-dom"

import Input from "./ui/Input";

export default function Sign({ type }) {
  return (<main>
    <form className="sign">
      <h1 className="sign__title">{type === "in" ? "Вход" :
        "Регистрация"}</h1>
      <Input place="sign" placeholder="Email" type="email" />
      <Input place="sign" placeholder="Пароль" type="text" />
      <button className="sign__button">{type === "in" ? "Войти" : "Зарегестрироваться"}</button>
      <p className="sign__subtitle">{type === "in" ? "Ещё не зарегистрированы? " : "Уже зарегистрированы? "}<Link className="sign__link" to={type === "in" ? "/sign-up" : "/sign-in"}>{type === "in" ? "Регистрация" : "Войти"}</Link></p>
    </form>
  </main>
  )
}
