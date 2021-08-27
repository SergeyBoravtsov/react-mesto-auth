import React from "react";
import { Link } from "react-router-dom";

function Header({ link, text }) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <Link className="header__link" to={link}>
        {text}
      </Link>
    </header>
  );
}

export default Header;
