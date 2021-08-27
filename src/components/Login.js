import React from "react";
import { Link, withRouter } from "react-router-dom";
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
    }
    // здесь авторизуем пользователя
    // далее проверяем токен
    // наконец, перенаправляем пользователя на страницу `/`
    // в случае ошибки показываем попап this.props.onError()

    else {
    mestoAuth.authorize(this.state.email, this.state.password)
      .then(response => {
      console.log(response);
      if (response.ok) {
      return response.json()
    } 
    else {
      this.props.onError();
    }})
    .then(data => {
      console.log(data);
      if (data.jwt) {
        localStorage.setItem('jwt', data.jwt);
        return data;
      }
    })
    .catch(err => console.error(err));

    
  }}

  render() {
    return (
      <div className="page">
        <Header text="Регистрация" link="/sign-up" />
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

export default Login;
