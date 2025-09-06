// src/pages/UserPage.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCog } from 'react-icons/fa';
import { FaLink, FaGithub, FaLinkedin, FaTwitter, FaYoutube, FaFileAlt, FaGlobe, FaInstagram, FaPalette, FaCode } from 'react-icons/fa';
import LinkManager from '../components/LinkManager';
import Logout from '../components/Logout';
import SettingsModal from '../components/SettingsModal';
import './UserPage.css';
import '../components/LinkManager.css';
import { jwtDecode } from 'jwt-decode'; // Giriş bilgisini çözmek için
import Login from '../components/Login'; // Giriş butonunu import et

// İkon bileşenleri
const icons = { FaLink, FaGithub, FaLinkedin, FaTwitter, FaYoutube, FaFileAlt, FaGlobe, FaInstagram, FaPalette, FaCode };
const IconComponent = ({ iconName }) => {
  const Icon = icons[iconName];
  return Icon ? <Icon className="link-icon" /> : <FaLink className="link-icon" />;
};

function UserPage() {
  const { username } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [links, setLinks] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [theme, setTheme] = useState('#ffffff');

  useEffect(() => {
    // Bu kısımda bir değişiklik yok
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    const publicProfile = JSON.parse(localStorage.getItem(`profile-${username}`));
    const storedLinks = JSON.parse(localStorage.getItem(`links-${username}`)) || [];
    setLinks(storedLinks);
    if (loggedInUser && loggedInUser.username === username) {
      setIsOwner(true);
      const currentProfile = { name: loggedInUser.name, picture: loggedInUser.picture };
      setProfile(currentProfile);
      if (!publicProfile) {
        localStorage.setItem(`profile-${username}`, JSON.stringify(currentProfile));
      }
    } else if (publicProfile) {
      setIsOwner(false);
      setProfile(publicProfile);
    } else {
      setIsOwner(false);
      setProfile({ name: username, picture: 'images/avatar-default.svg' });
    }
    const savedTheme = localStorage.getItem(`theme-${username}`) || '#ffffff';
    setTheme(savedTheme);
  }, [username]);

   const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    const firstName = decoded.given_name.toLowerCase().replace(/\s+/g, '');
    const lastName = decoded.family_name.toLowerCase().replace(/\s+/g, '');
    const username = `${firstName}${lastName}`;
    const userData = { ...decoded, username };
    localStorage.setItem('user', JSON.stringify(userData));
    navigate(`/${username}`);
  };

  const handleAddLink = (newLink) => {
    const linkWithId = { ...newLink, id: `link-${Date.now()}` };
    const updatedLinks = [...links, linkWithId];
    setLinks(updatedLinks);
    localStorage.setItem(`links-${username}`, JSON.stringify(updatedLinks));
  };

  const handleRemoveLink = (indexToRemove) => {
    const updatedLinks = links.filter((_, index) => index !== indexToRemove);
    setLinks(updatedLinks);
    localStorage.setItem(`links-${username}`, JSON.stringify(updatedLinks));
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsOwner(false);
    navigate('/');
  };

  const handleThemeChange = (color) => {
    setTheme(color);
    localStorage.setItem(`theme-${username}`, color);
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <>
      <SettingsModal isOpen={isSettingsOpen} onRequestClose={() => setSettingsOpen(false)} onThemeChange={handleThemeChange} currentTheme={theme} />
      <div className="user-page-container" style={{ backgroundColor: theme }}>
        <div className="user-page">
          {isOwner && (
            <div className="buttons-container">
               <button 
                className="page-action-button" 
                onClick={() => setSettingsOpen(true)} 
                title="Settings"
              >
                <FaCog />
              </button>
               <Logout 
                onLogout={handleLogout} 
                className="page-action-button" 
              />
            </div>
          )}
          <div className="user-header">
            <img src={profile.picture} alt="Profile" className="profile-picture" />
            <h2>{profile.name}</h2>
            <p>@{username}</p>
          </div>
          
          <LinkManager onAddLink={handleAddLink} isOwner={isOwner} />
          <div className="links-container">
            <ul className="links-list">
              {links.map((link, index) => (
                <li key={link.id} className="link-item">
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    <IconComponent iconName={link.icon} />
                    <span>{link.title}</span>
                  </a>
                  {isOwner && (
                    <button onClick={() => handleRemoveLink(index)} className="remove-link-button">&times;</button>
                  )}
                </li>
              ))}
            </ul>
          </div>
          {links.length === 0 && (
            <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>
              {isOwner ? "Your universe is empty. Add your first link!" : "This user hasn't added any links yet."}
            </p>
          )}
          {!isOwner && (
            <div className="create-your-own-section">
              <p>Do you want to have a page like this? Create it for free!</p>
              <Login 
                onSuccess={handleLoginSuccess}
                onError={() => console.log('Login Failed')}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UserPage;