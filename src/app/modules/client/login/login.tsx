import { useState } from 'react';
import './login.css';
import loginBg from './img/login-bg.png'; // Import ảnh từ đường dẫn của bạn
export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event:any) => {
    event.preventDefault();
  };

  return (
    <div className="login">
      <img src={loginBg} alt="login" className="login__img" />
      <form onSubmit={handleSubmit} className="login__form">
        <h1 className="login__title">Login</h1>
        <div className="login__content">
          <div className="login__box">
            <i className="ri-user-3-line login__icon"></i>

            <div className="login__box-input">
              <input
                type="email"
                required
                className="login__input"
                id="login-email"
                placeholder=" "
              />
              <label htmlFor="login-email" className="login__label">
                Email
              </label>
            </div>
          </div>

          <div className="login__box">
            <i className="ri-lock-2-line login__icon"></i>

            <div className="login__box-input">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                className="login__input"
                id="login-pass"
                placeholder=" "
              />
              <label htmlFor="login-pass" className="login__label">
                Password
              </label>
              <i
                className={`ri-eye${showPassword ? '-line' : '-off-line'} login__eye`}
                id="login-eye"
                onClick={handlePasswordToggle}
                style={{ cursor: 'pointer' }}
              ></i>
            </div>
          </div>
        </div>

        <div className="login__check">
          <div className="login__check-group">
            <input type="checkbox" className="login__check-input" id="login-check" />
            <label htmlFor="login-check" className="login__check-label">
              Remember me
            </label>
          </div>

          <a href="#" className="login__forgot">
            Forgot Password?
          </a>
        </div>

        <button type="submit" className="login__button">
          Login
        </button>

        <p className="login__register">
          Don't have an account? <a href="#">Register</a>
        </p>
      </form>
    </div>
  );
};

