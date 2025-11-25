import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/login';
import './styles.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const response = await loginUser(formData);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate('/profile');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrors({ general: [error.response.data.message || 'Неверный email или пароль'] });
      } else if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        setErrors({ general: ['Произошла ошибка при авторизации'] });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container" data-easytag="id1-react/src/components/Login/index.jsx">
      <div className="login-card">
        <h1 className="login-title">Авторизация</h1>
        <p className="login-subtitle">Войдите в свой аккаунт</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'input-error' : ''}`}
              placeholder="Введите ваш email"
              required
            />
            {errors.email && (
              <div className="error-message">
                {errors.email.map((err, index) => (
                  <p key={index}>{err}</p>
                ))}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Пароль
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`form-input ${errors.password ? 'input-error' : ''}`}
              placeholder="Введите пароль"
              required
            />
            {errors.password && (
              <div className="error-message">
                {errors.password.map((err, index) => (
                  <p key={index}>{err}</p>
                ))}
              </div>
            )}
          </div>

          {errors.general && (
            <div className="error-message general-error">
              {errors.general.map((err, index) => (
                <p key={index}>{err}</p>
              ))}
            </div>
          )}

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>

        <div className="login-footer">
          <p className="footer-text">
            Нет аккаунта?{' '}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="link-button"
            >
              Зарегистрироваться
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
