import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import Card from "./Card.js";

export default function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onLike,
  onDelete,
}) {
  const { name, about, avatar } = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__inner-wrapper profile__inner-wrapper_place_profile">
          <img alt="Аватар" className="profile__avatar" src={avatar} />
          <button
            className="profile__avatar-overlay"
            onClick={onEditAvatar}
          ></button>
          <div className="profile__info">
            <div className="profile__inner-wrapper profile__inner-wrapper_place_name">
              <h1 className="profile__name">{name}</h1>
              <button
                className="profile__edit-button"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__subtitle">{about}</p>
          </div>
        </div>
        <button className="profile__add-button" onClick={onAddPlace}></button>
      </section>

      <section className="card__container">
        {cards.map((item) => {
          return (
            <Card
              onCardClick={onCardClick}
              likes={item.likes}
              ownerId={item.owner._id}
              key={item._id}
              title={item.name}
              url={item.link}
              cardId={item._id}
              onCardLike={onLike}
              onCardDelete={onDelete}
            />
          );
        })}
      </section>
    </main>
  );
}
