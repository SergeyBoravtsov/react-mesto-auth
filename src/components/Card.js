import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardTrashButtonClassName = `card__trash-button ${
    isOwn ? "" : "card__trash-button_invisible"
  }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_dark" : ""
  }`;

  return (
    <li className="card">
      <img
        className="card__image"
        onClick={handleCardClick}
        src={card.link}
        alt={card.name}
      />
      <button
        className={cardTrashButtonClassName}
        onClick={handleDeleteClick}
      ></button>
      <div className="card__mesto">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-and-counter">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
