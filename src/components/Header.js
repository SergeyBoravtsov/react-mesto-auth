import React from "react";
import { Link } from "react-router-dom";

function Header({ link, text, email }) {
  function signOut() {
    localStorage.removeItem("jwt");
  }

  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__info">
        <p className="header__user-email">{email}</p>
        <Link className="header__link" to={link} onClick={signOut}>
          {text}
        </Link>
      </div>
    </header>
  );
}

export default Header;
