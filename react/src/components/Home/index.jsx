import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export const Home = () => {
  return (
    <div className="home-container" data-easytag="id1-react/src/components/Home/index.jsx">
      <div className="home-content">
        <div className="welcome-section">
          <h1 className="welcome-title">Добро пожаловать!</h1>
          <p className="welcome-description">
            Это главная страница приложения. Выберите нужный раздел для продолжения работы.
          </p>
        </div>

        <nav className="navigation-section">
          <h2 className="navigation-title">Навигация</h2>
          <div className="navigation-links">
            <Link to="/register" className="nav-link register-link">
              <span className="link-icon">📝</span>
              <span className="link-text">Регистрация</span>
              <span className="link-arrow">→</span>
            </Link>
            
            <Link to="/login" className="nav-link login-link">
              <span className="link-icon">🔐</span>
              <span className="link-text">Авторизация</span>
              <span className="link-arrow">→</span>
            </Link>
            
            <Link to="/profile" className="nav-link profile-link">
              <span className="link-icon">👤</span>
              <span className="link-text">Профиль</span>
              <span className="link-arrow">→</span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};
