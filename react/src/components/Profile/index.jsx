import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../../api/profile';
import './styles.css';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProfile(token);
        setUser(data);
      } catch (err) {
        setError(err.response?.data?.detail || 'Ошибка при загрузке профиля');
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="profile-container" data-easytag="id1-react/src/components/Profile/index.jsx">
        <div className="profile-card">
          <div className="loading">Загрузка...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container" data-easytag="id1-react/src/components/Profile/index.jsx">
        <div className="profile-card">
          <div className="error">{error}</div>
          <button onClick={() => navigate('/login')} className="logout-button">
            Вернуться к авторизации
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container" data-easytag="id1-react/src/components/Profile/index.jsx">
      <div className="profile-card">
        <h1 className="profile-title">Профиль пользователя</h1>

        <div className="profile-info">
          <div className="info-item">
            <span className="info-label">Имя и фамилия:</span>
            <span className="info-value">
              {user?.first_name} {user?.last_name}
            </span>
          </div>

          <div className="info-item">
            <span className="info-label">Email:</span>
            <span className="info-value">{user?.email}</span>
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
