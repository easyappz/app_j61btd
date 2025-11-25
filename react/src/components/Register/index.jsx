import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/register';
import './styles.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
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
      await registerUser(formData);
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        setErrors({ general: ['Произошла ошибка при регистрации'] });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container" data-easytag="id1-react/src/components/Register/index.jsx">
      <div className="register-card">
        <h1 className="register-title">Регистрация</h1>
        <p className="register-subtitle">Создайте новый аккаунт</p>

        <form onSubmit={handleSubmit} className="register-form">
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
              placeholder="Введите пароль (минимум 8 символов)"
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

          <div className="form-group">
            <label htmlFor="first_name" className="form-label">
              Имя
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className={`form-input ${errors.first_name ? 'input-error' : ''}`}
              placeholder="Введите ваше имя"
              required
            />
            {errors.first_name && (
              <div className="error-message">
                {errors.first_name.map((err, index) => (
                  <p key={index}>{err}</p>
                ))}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="last_name" className="form-label">
              Фамилия
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className={`form-input ${errors.last_name ? 'input-error' : ''}`}
              placeholder="Введите вашу фамилию"
              required
            />
            {errors.last_name && (
              <div className="error-message">
                {errors.last_name.map((err, index) => (
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
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
        </form>

        <div className="register-footer">
          <p className="footer-text">
            Уже есть аккаунт?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="link-button"
            >
              Войти
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
