// src/components/LinkManager.js

import React, { useState } from 'react';
import { FaLink, FaGithub, FaLinkedin, FaTwitter, FaYoutube, FaFileAlt, FaGlobe, FaInstagram, FaPalette, FaCode } from 'react-icons/fa';
import './LinkManager.css';

const icons = { FaLink, FaGithub, FaLinkedin, FaTwitter, FaYoutube, FaFileAlt, FaGlobe, FaInstagram, FaPalette, FaCode };

function LinkManager({ onAddLink, isOwner }) {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('FaLink');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url && title) {
      onAddLink({ title, url, icon: selectedIcon });
      setTitle('');
      setUrl('');
      setSelectedIcon('FaLink');
    }
  };

  // Eğer kullanıcı sayfa sahibi değilse, formu hiç gösterme
  if (!isOwner) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="link-form">
      <div className="inputs-container">
        <input
          id='link-title'
          type="text"
          placeholder="Link Title (e.g., My Portfolio)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="link-input"
        />
        <input
          id='link-url'
          type="url"
          placeholder="URL (e.g., https://example.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="link-input"
        />
      </div>
      <div className="icon-picker-container">
        <h4>Choose an Icon</h4>
        <div className="icon-grid">
          {Object.keys(icons).map(iconName => {
            const Icon = icons[iconName];
            return (
              <span key={iconName} className={`icon-option ${selectedIcon === iconName ? 'selected' : ''}`} onClick={() => setSelectedIcon(iconName)}>
                <Icon />
              </span>
            );
          })}
        </div>
      </div>
      <button type="submit" className="add-link-button">Add Link</button>
    </form>
  );
}

export default LinkManager;