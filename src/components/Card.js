import React from "react";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({
  onCardClick,
  url,
  title,
  likes,
  ownerId,
  cardId,
  onCardLike,
  onCardDelete,
}) {
  const { _id: userId } = React.useContext(CurrentUserContext);

  const isLiked = likes.some((item) => {
    return item._id === userId;
  });
  
  return (
    <div className="card">
      <img
        alt="Изображение карточки"
        className="card__image"
        onClick={() => {
          onCardClick({
            url: url,
            title: title,
          });
        }}
        src={url}
      />
      <h2 className="card__title">{title}</h2>
      <button
        onClick={() => {
          onCardLike(cardId, isLiked);
        }}
        className={`card__like ${isLiked && "card__like_mode_active"}`}
      ></button>
      <p className="card__like-count">{likes.length}</p>
      {ownerId === userId && (
        <button
          className="card__delete"
          onClick={() => {
            onCardDelete(cardId);
          }}
        ></button>
      )}
    </div>
  );
}
