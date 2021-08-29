import React from "react";
import { withRouter } from "react-router-dom";
import Header from "./Header.js";
import * as mestoAuth from "../utils/auth.js";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.email || !this.state.password) {
      return;
    } else {
      mestoAuth
        .authorize(this.state.email, this.state.password)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            this.props.onError();
            return Promise.reject(`Ошибка авторизации: ${response.status}`);
          }
        })
        .then((data) => {
          if (data.token) {
            localStorage.setItem("jwt", data.token); //записываем токен в локальное хранилище

            // меняем в App стейт userEmail, чтобы введённый email отобразился в шапке
            this.props.onUserEmail(this.state.email);

            this.setState({ email: "", password: "" }, () => {
              this.props.onLogin(); // меняем стейт isLoggedIn в App.js на true
              this.props.history.push("/"); // переходим на главную страницу приложения
            });

            return data;
          } else {
            return;
          }
        })
        .catch((err) => console.error(err));
    }
  }

  render() {
    return (
      <div className="page">
        <Header text="Регистрация" link="/sign-up" email="" />
        <div className="login">
          <p className="login__title">Вход</p>
          <form onSubmit={this.handleSubmit} className="login__form">
            <input
              className="login__input"
              required
              id="email"
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="Email"
            />
            <input
              className="login__input"
              required
              id="password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              placeholder="Пароль"
            />
            <div className="login__button-container">
              <button type="submit" className="login__link">
                Войти
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
