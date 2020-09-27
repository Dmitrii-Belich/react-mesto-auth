import React from "react";
import { Link, Route } from "react-router-dom";

import logo from "../images/logo.svg";

export default function Header({ email, onExit }) {
  return (
    <header className="header">
      <div className="header__wrapper">
        <img src={logo} alt="Логотип" className="header__logo" />
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__link">
            Войти
          </Link>
        </Route>
        <Route path="/sign-in">
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>
        </Route>
        <Route exact path="/">
          <div className="header__info">
            <p className="header__email">{email}</p>
            <button to="/" className="header__exit" onClick={onExit}>
              Выйти
            </button>
          </div>
        </Route>
      </div>
    </header>
  );
}
