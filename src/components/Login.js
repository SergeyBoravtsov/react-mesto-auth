import React from "react";
import { Link, withRouter } from "react-router-dom";
import Header from "./Header.js";
//import './styles/Login.css';

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
    // здесь обрабатываем вход в систему
  }
  render() {
    return (
      <div className="page">
        <Header />
        <div className="login">
          <p className="login__title">Вход</p>
          <form onSubmit={this.handleSubmit} className="login__form">
            <label htmlFor="email">Email:</label>
            <input
              required
              id="email"
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <label htmlFor="password">Пароль:</label>
            <input
              required
              id="password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <div className="login__button-container">
              <button type="submit" className="login__link">
                Войти
              </button>
            </div>
          </form>
          <div className="login__signup">
            <Link to="/register" className="signup__link">
              Регистрация
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
