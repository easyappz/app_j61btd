import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');

  React.useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="profile-container" data-easytag="id1-react/src/components/Profile/index.jsx">
      <div className="profile-card">
        <h1 className="profile-title">Профиль</h1>

        <div className="profile-info">
          <div className="info-item">
            <span className="info-label">Email:</span>
            <span className="info-value">{user.email}</span>
          </div>

          <div className="info-item">
            <span className="info-label">Имя:</span>
            <span className="info-value">{user.first_name}</span>
          </div>

          <div className="info-item">
            <span className="info-label">Фамилия:</span>
            <span className="info-value">{user.last_name}</span>
          </div>

          <div className="info-item">
            <span className="info-label">ID:</span>
            <span className="info-value">{user.id}</span>
          </div>
        </div>

        <button onClick={handleLogout} className="logout-button">
          Выйти
        </button>
      </div>
    </div>
  );
};

export default Profile;
