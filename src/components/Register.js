import React from "react";
import { Link, withRouter } from "react-router-dom";
import Header from "./Header.js";
import * as mestoAuth from "../utils/auth.js";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    mestoAuth.register(this.state.email, this.state.password)
      .then((response) => {
        if (response.status === 201) {
          this.props.onSuccess();
          this.props.history.push("/sign-in");
          return response.json();
        } else {
          this.props.onError();
          return Promise.reject(`Ошибка регистрации: ${response.status}`);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  render() {
    return (
      <div className="page">
        <Header text="Войти" link="/sign-in" email="" />
        <div className="register">
          <p className="register__title">Регистрация</p>
          <form onSubmit={this.handleSubmit} className="register__form">
            <input
              className="register__input"
              id="email"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="Email"
              required
            />
            <input
              className="register__input"
              id="password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              placeholder="Пароль"
              required
            />

            <button type="submit" className="register__button">
              Зарегистрироваться
            </button>
          </form>
          <div className="register__signin">
            <p>Уже зарегистрированы?</p>
            <Link to="/sign-in" className="register__login-link">
              Войти
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
