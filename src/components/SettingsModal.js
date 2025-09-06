import React from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import './SettingsModal.css';

Modal.setAppElement('#root');

const themeColors = ['#ffffff', '#6093e1ff', '#45f5f5ff', '#ed656eff', '#f5dc5eff', '#262626'];

const SettingsModal = ({ isOpen, onRequestClose, onThemeChange, currentTheme }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="settings-modal"
      overlayClassName="settings-overlay"
    >
      <div className="modal-header">
        <h2>Settings</h2>
        <button onClick={onRequestClose} className="close-button"><FaTimes /></button>
      </div>
      <div className="modal-content">
        <div className="settings-section">
          <h3>Page Theme</h3>
          <div className="theme-options">
            {themeColors.map(color => (
              <div
                key={color}
                className={`theme-swatch ${currentTheme === color ? 'active' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => onThemeChange(color)}
              />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SettingsModal;