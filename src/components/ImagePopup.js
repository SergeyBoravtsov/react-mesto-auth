import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <article className={`popup popup_big-image ${card.name && "popup_opened"}`}>
      <div className="popup__container popup__container_big-image">
        <button onClick={onClose} type="button" className="popup__close" />
        <img className="popup__image" src={card.link} alt={card.name} />
        <p className="popup__caption">{card.name}</p>
      </div>
    </article>
  );
}

export default ImagePopup;
