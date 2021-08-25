import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header.js";
//import './styles/Register.css';

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
    // здесь обработчик регистрации
  };
  render() {
    return (
      <div className="page">
        <Header>Registration</Header>
        <div className="register">
          <p className="register__title">Регистрация</p>
          <form onSubmit={this.handleSubmit} className="register__form">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <label htmlFor="password">Пароль:</label>
            <input
              id="password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <div className="register__button-container">
              <button
                type="submit"
                onSubmit={this.handleSubmit}
                className="register__link"
              >
                Зарегистрироваться
              </button>
            </div>
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

export default Register;
