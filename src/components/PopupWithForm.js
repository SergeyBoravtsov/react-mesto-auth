import React from "react";

function PopupWithForm({
  name,
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  buttonText,
  buttonName,
}) {
  return (
    <article className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          onClick={onClose}
          type="button"
          className="popup__close"
        ></button>
        <form
          className="popup__form"
          name={name}
          id={`${name}-form`}
          onSubmit={onSubmit}
          /* noValidate */
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button type="submit" className="popup__button" name={buttonName}>
            {buttonText}
          </button>
        </form>
      </div>
    </article>
  );
}

export default PopupWithForm;
