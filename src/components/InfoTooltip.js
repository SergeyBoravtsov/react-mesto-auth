import React from "react";

function InfoTooltip({ name, isOpen, onClose, picture, info }) {
  return (
    <article className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          onClick={onClose}
          type="button"
          className="popup__close"
        ></button>
        <div
          className="popup__sign"
          style={{ backgroundImage: `url(${picture})` }}
        ></div>
        <p className="popup__information">{info}</p>
      </div>
    </article>
  );
}

export default InfoTooltip;
