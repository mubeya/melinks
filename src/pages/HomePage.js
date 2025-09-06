import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { FaLink, FaPaintBrush, FaShareAlt, FaGithub } from 'react-icons/fa';

import Login from '../components/Login';
import Logout from '../components/Logout';
import './HomePage.css';

function HomePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    const firstName = decoded.given_name.toLowerCase().replace(/\s+/g, '');
    const lastName = decoded.family_name.toLowerCase().replace(/\s+/g, '');
    const username = `${firstName}${lastName}`;
    
    const userData = { ...decoded, username };
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    navigate(`/${username}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="homepage-wrapper">
      <div className="homepage-main">
        <div className="content-section">
          <h1>One Link <br></br> Infinite Possibilities</h1>
          <p className="subtitle">Your digital universe, unified. Create a mini-homepage to share all your links in one place.</p>
          <ul className="features-list">
            <li><FaLink /> Combine all your content.</li>
            <li><FaPaintBrush /> Customize with unique icons.</li>
            <li><FaShareAlt /> Share one link, anywhere.</li>
          </ul>
          <div className="login-area">
            {user ? (
              <div className="user-greeting">
                <p>{`Welcome back, ${user.name}!`}</p>
                <div className="action-buttons">
                  <button className="my-page-button" onClick={() => navigate(`/${user.username}`)}>
                    Enter Your Universe
                  </button>
                  <Logout onLogout={handleLogout} />
                </div>
              </div>
            ) : (
              <Login onSuccess={handleLoginSuccess} onError={() => console.log('Login Failed')} />
            )}
          </div>
        </div>
        <div className="visual-section">
          <div className="phone-mockup">
            <div className="phone-screen">
              <img src="images/avatar-default.svg" alt="avatar" className="mock-avatar" />
              <p className="mock-username">@username</p>
              <div className="mock-link"><FaGithub /> GitHub</div>
              <div className="mock-link"><FaLink /> Portfolio</div>
              <div className="mock-link"><FaShareAlt /> Social Media</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;